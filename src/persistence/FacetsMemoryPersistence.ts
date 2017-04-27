let _ = require('lodash');

import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { MemoryPersistence } from 'pip-services-data-node';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';

export class FacetsMemoryPersistence extends MemoryPersistence<FacetV1> 
    implements IConfigurable, IFacetsPersistence {
    protected _maxPageSize: number = 100;

    constructor() {
        super();
    }

    public configure(config: ConfigParams): void {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }

    public getPageByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        let items = _.filter(this._items, (item) => item.group == group && item.count > 0);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = items.length;
        
        if (skip > 0)
            items = _.slice(items, skip);
        items = _.take(items, take);
        
        this._logger.trace(correlationId, "Retrieved %d items", items.length);
        
        let page = new DataPage<FacetV1>(items, total);
        callback(null, page);
    }

    public addOne(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {

        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item.count++;
        } else {
            item = new FacetV1(group, name, 1);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Added item %s-%s", item.group, item.name);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    public removeOne(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item = item > 0 ? item - 1 : 0;
        } else {
            item = new FacetV1(group, name, 0);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Removed item %s-%s", item.group, item.name);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    public deleteByGroup(correlationId: string, group: string,
        callback: (err: any) => void): void {
        let deleted = 0;
        for (let index = this._items.length - 1; index>= 0; index--) {
            let item = this._items[index];
            if (item.group == group) {
                this._items.splice(index, 1);
                deleted++;
            }
        }

        if (deleted == 0) {
            callback(null);
            return;
        }

        this._logger.trace(correlationId, "Deleted %s items", deleted);

        this.save(correlationId, (err) => {
            if (callback) callback(err)
        });
    }

}
