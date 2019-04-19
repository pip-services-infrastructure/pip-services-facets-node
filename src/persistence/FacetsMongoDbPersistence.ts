let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { MongoDbPersistence } from 'pip-services3-mongodb-node';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';
import { FacetsMongoDbSchema } from './FacetsMongoDbSchema';

export class FacetsMongoDbPersistence extends MongoDbPersistence
    implements IFacetsPersistence {
    protected _maxPageSize: number = 100;

    constructor() {
        super('facets', FacetsMongoDbSchema());
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }

    public getPageByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {

        // Filter to select non-zero facets
        let filter = { 
            group: group, 
            count: { $gt: 0 } 
        };

        // Adjust max item count based on configuration
        paging = paging || new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let pagingEnabled = paging.total;

        // Configure statement
        let statement = this._model.find(filter);

        if (skip >= 0) statement.skip(skip);
        statement.limit(take);

        statement.exec((err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (items != null)
                this._logger.trace(correlationId, "Retrieved %d from %s", items.length, this._collection);

            items = _.map(items, this.convertToPublic);

            if (pagingEnabled) {
                this._model.count(filter, (err, count) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                        
                    let page = new DataPage<FacetV1>(items, count);
                    callback(null, page);
                });
            } else {
                let page = new DataPage<FacetV1>(items);
                callback(null, page);
            }
        });
    }

    public addOne(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {

        let filter = {
            group: group,
            name: name
        };

        let newItem = {
            $inc: { count: 1 }
        }

        let options = {
            new: true,
            upsert: true
        };
        
        this._model.findOneAndUpdate(filter, newItem, options, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);
           
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }

    public removeOne(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        let filter = {
            group: group,
            name: name,
            count: { $gt: 0 }
        };

        let newItem = {
            $inc: { count: -1 }
        }

        let options = {
            new: true,
            upsert: false
        };
        
        this._model.findOneAndUpdate(filter, newItem, options, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);

            if (err == null && newItem == null)
                newItem = new FacetV1(group, name, 0);

            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }

    public deleteByGroup(correlationId: string, group: string,
        callback: (err: any) => void): void {
        let filter = { group: group };
        this._model.remove(filter, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Deleted %d items from %s", count, this._collection);

            if (callback) callback(err);
        });
    }
}
