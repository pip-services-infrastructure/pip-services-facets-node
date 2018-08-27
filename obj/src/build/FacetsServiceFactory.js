"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const FacetsMongoDbPersistence_1 = require("../persistence/FacetsMongoDbPersistence");
const FacetsFilePersistence_1 = require("../persistence/FacetsFilePersistence");
const FacetsMemoryPersistence_1 = require("../persistence/FacetsMemoryPersistence");
const FacetsController_1 = require("../logic/FacetsController");
const FacetsHttpServiceV1_1 = require("../services/version1/FacetsHttpServiceV1");
const FacetsSenecaServiceV1_1 = require("../services/version1/FacetsSenecaServiceV1");
class FacetsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(FacetsServiceFactory.MemoryPersistenceDescriptor, FacetsMemoryPersistence_1.FacetsMemoryPersistence);
        this.registerAsType(FacetsServiceFactory.FilePersistenceDescriptor, FacetsFilePersistence_1.FacetsFilePersistence);
        this.registerAsType(FacetsServiceFactory.MongoDbPersistenceDescriptor, FacetsMongoDbPersistence_1.FacetsMongoDbPersistence);
        this.registerAsType(FacetsServiceFactory.ControllerDescriptor, FacetsController_1.FacetsController);
        this.registerAsType(FacetsServiceFactory.SenecaServiceDescriptor, FacetsSenecaServiceV1_1.FacetsSenecaServiceV1);
        this.registerAsType(FacetsServiceFactory.HttpServiceDescriptor, FacetsHttpServiceV1_1.FacetsHttpServiceV1);
    }
}
FacetsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "factory", "default", "default", "1.0");
FacetsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "persistence", "memory", "*", "1.0");
FacetsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "persistence", "file", "*", "1.0");
FacetsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "persistence", "mongodb", "*", "1.0");
FacetsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "controller", "default", "*", "1.0");
FacetsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "service", "seneca", "*", "1.0");
FacetsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-facets", "service", "http", "*", "1.0");
exports.FacetsServiceFactory = FacetsServiceFactory;
//# sourceMappingURL=FacetsServiceFactory.js.map