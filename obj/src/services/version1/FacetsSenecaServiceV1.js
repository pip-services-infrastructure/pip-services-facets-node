"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class FacetsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('facets');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-facets', 'controller', 'default', '*', '1.0'));
    }
}
exports.FacetsSenecaServiceV1 = FacetsSenecaServiceV1;
//# sourceMappingURL=FacetsSenecaServiceV1.js.map