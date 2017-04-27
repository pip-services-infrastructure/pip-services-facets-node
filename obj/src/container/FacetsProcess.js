"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const FacetsServiceFactory_1 = require("../build/FacetsServiceFactory");
class FacetsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("facets", "Faceted search microservice");
        this._factories.add(new FacetsServiceFactory_1.FacetsServiceFactory);
    }
}
exports.FacetsProcess = FacetsProcess;
//# sourceMappingURL=FacetsProcess.js.map