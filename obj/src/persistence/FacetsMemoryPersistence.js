"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const FacetV1_1 = require("../data/version1/FacetV1");
class FacetsMemoryPersistence extends pip_services_data_node_1.MemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 100;
    }
    configure(config) {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }
    getPageByGroup(correlationId, group, paging, callback) {
        let items = _.filter(this._items, (item) => item.group == group && item.count > 0);
        // Extract a page
        paging = paging != null ? paging : new pip_services_commons_node_1.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = items.length;
        if (skip > 0)
            items = _.slice(items, skip);
        items = _.take(items, take);
        this._logger.trace(correlationId, "Retrieved %d items", items.length);
        let page = new pip_services_commons_node_2.DataPage(items, total);
        callback(null, page);
    }
    addOne(correlationId, group, name, callback) {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item.count++;
        }
        else {
            item = new FacetV1_1.FacetV1(group, name, 1);
            this._items.push(item);
        }
        this._logger.trace(correlationId, "Added item %s-%s", item.group, item.name);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
    removeOne(correlationId, group, name, callback) {
        let item = _.find(this._items, (item) => item.group == group && item.name == name);
        if (item != null) {
            item = item > 0 ? item - 1 : 0;
        }
        else {
            item = new FacetV1_1.FacetV1(group, name, 0);
            this._items.push(item);
        }
        this._logger.trace(correlationId, "Removed item %s-%s", item.group, item.name);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
    deleteByGroup(correlationId, group, callback) {
        let deleted = 0;
        for (let index = this._items.length - 1; index >= 0; index--) {
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
            if (callback)
                callback(err);
        });
    }
}
exports.FacetsMemoryPersistence = FacetsMemoryPersistence;
//# sourceMappingURL=FacetsMemoryPersistence.js.map