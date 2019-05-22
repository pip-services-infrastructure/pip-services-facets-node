"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_mongoose_node_1 = require("pip-services3-mongoose-node");
const FacetV1_1 = require("../data/version1/FacetV1");
const FacetsMongooseSchema_1 = require("./FacetsMongooseSchema");
class FacetsMongoDbPersistence extends pip_services3_mongoose_node_1.MongoosePersistence {
    constructor() {
        super('facets', FacetsMongooseSchema_1.FacetsMongooseSchema());
        this._maxPageSize = 100;
    }
    configure(config) {
        super.configure(config);
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }
    getPageByGroup(correlationId, group, paging, callback) {
        // Filter to select non-zero facets
        let filter = {
            group: group,
            count: { $gt: 0 }
        };
        // Adjust max item count based on configuration
        paging = paging || new pip_services3_commons_node_1.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let pagingEnabled = paging.total;
        // Configure statement
        let statement = this._model.find(filter);
        if (skip >= 0)
            statement.skip(skip);
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
                    let page = new pip_services3_commons_node_2.DataPage(items, count);
                    callback(null, page);
                });
            }
            else {
                let page = new pip_services3_commons_node_2.DataPage(items);
                callback(null, page);
            }
        });
    }
    addOne(correlationId, group, name, callback) {
        let filter = {
            group: group,
            name: name
        };
        let newItem = {
            $inc: { count: 1 }
        };
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
    removeOne(correlationId, group, name, callback) {
        let filter = {
            group: group,
            name: name,
            count: { $gt: 0 }
        };
        let newItem = {
            $inc: { count: -1 }
        };
        let options = {
            new: true,
            upsert: false
        };
        this._model.findOneAndUpdate(filter, newItem, options, (err, newItem) => {
            if (!err)
                this._logger.trace(correlationId, "Set in %s with %s - %s", this._collection, group, name);
            if (err == null && newItem == null)
                newItem = new FacetV1_1.FacetV1(group, name, 0);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
    deleteByGroup(correlationId, group, callback) {
        let filter = { group: group };
        this._model.remove(filter, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Deleted %d items from %s", count, this._collection);
            if (callback)
                callback(err);
        });
    }
}
exports.FacetsMongoDbPersistence = FacetsMongoDbPersistence;
//# sourceMappingURL=FacetsMongoDbPersistence.js.map