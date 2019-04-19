"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const FacetsServiceFactory_1 = require("../build/FacetsServiceFactory");
class FacetsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("facets", "Faceted search microservice");
        this._factories.add(new FacetsServiceFactory_1.FacetsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.FacetsProcess = FacetsProcess;
//# sourceMappingURL=FacetsProcess.js.map