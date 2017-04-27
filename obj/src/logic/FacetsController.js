"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const FacetsCommandSet_1 = require("./FacetsCommandSet");
class FacetsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(FacetsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new FacetsCommandSet_1.FacetsCommandSet(this);
        return this._commandSet;
    }
    getFacetsByGroup(correlationId, group, paging, callback) {
        this._persistence.getPageByGroup(correlationId, group, paging, callback);
    }
    addFacet(correlationId, group, name, callback) {
        this._persistence.addOne(correlationId, group, name, callback);
    }
    removeFacet(correlationId, group, name, callback) {
        this._persistence.removeOne(correlationId, group, name, callback);
    }
    deleteFacetsByGroup(correlationId, group, callback) {
        this._persistence.deleteByGroup(correlationId, group, callback);
    }
    clear(correlationId, callback) {
        this._persistence.clear(correlationId, callback);
    }
}
FacetsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-facets:persistence:*:*:1.0');
exports.FacetsController = FacetsController;
//# sourceMappingURL=FacetsController.js.map