"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
class FacetsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetFacetsByGroupCommand());
        this.addCommand(this.makeAddFacetCommand());
        this.addCommand(this.makeRemoveFacetCommand());
        this.addCommand(this.makeDeleteFacetsByGroupCommand());
        this.addCommand(this.makeClearCommand());
    }
    makeGetFacetsByGroupCommand() {
        return new pip_services_commons_node_2.Command("get_facets_by_group", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services_commons_node_5.TypeCode.String)
            .withOptionalProperty('paging', new pip_services_commons_node_6.PagingParamsSchema()), (correlationId, args, callback) => {
            let group = args.getAsNullableString("group");
            let paging = pip_services_commons_node_3.PagingParams.fromValue(args.get("paging"));
            this._logic.getFacetsByGroup(correlationId, group, paging, callback);
        });
    }
    makeAddFacetCommand() {
        return new pip_services_commons_node_2.Command("add_facet", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('name', pip_services_commons_node_5.TypeCode.String), (correlationId, args, callback) => {
            let group = args.getAsNullableString("group");
            let name = args.getAsNullableString("name");
            this._logic.addFacet(correlationId, group, name, callback);
        });
    }
    makeRemoveFacetCommand() {
        return new pip_services_commons_node_2.Command("remove_facet", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services_commons_node_5.TypeCode.String)
            .withRequiredProperty('name', pip_services_commons_node_5.TypeCode.String), (correlationId, args, callback) => {
            let group = args.getAsNullableString("group");
            let name = args.getAsNullableString("name");
            this._logic.removeFacet(correlationId, group, name, callback);
        });
    }
    makeDeleteFacetsByGroupCommand() {
        return new pip_services_commons_node_2.Command("delete_facets_by_group", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('group', pip_services_commons_node_5.TypeCode.String), (correlationId, args, callback) => {
            let group = args.getAsNullableString("group");
            this._logic.deleteFacetsByGroup(correlationId, group, (err) => {
                callback(err, null);
            });
        });
    }
    makeClearCommand() {
        return new pip_services_commons_node_2.Command("clear", new pip_services_commons_node_4.ObjectSchema(true), (correlationId, args, callback) => {
            this._logic.clear(correlationId, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.FacetsCommandSet = FacetsCommandSet;
//# sourceMappingURL=FacetsCommandSet.js.map