"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class FacetsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/facets');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-facets', 'controller', 'default', '*', '1.0'));
    }
}
exports.FacetsHttpServiceV1 = FacetsHttpServiceV1;
//# sourceMappingURL=FacetsHttpServiceV1.js.map