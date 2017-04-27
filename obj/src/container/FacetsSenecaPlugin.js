"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const FacetsMemoryPersistence_1 = require("../persistence/FacetsMemoryPersistence");
const FacetsFilePersistence_1 = require("../persistence/FacetsFilePersistence");
const FacetsMongoDbPersistence_1 = require("../persistence/FacetsMongoDbPersistence");
const FacetsController_1 = require("../logic/FacetsController");
const FacetsSenecaServiceV1_1 = require("../services/version1/FacetsSenecaServiceV1");
class FacetsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-facets', seneca, FacetsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new FacetsController_1.FacetsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new FacetsMongoDbPersistence_1.FacetsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new FacetsFilePersistence_1.FacetsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new FacetsMemoryPersistence_1.FacetsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new FacetsSenecaServiceV1_1.FacetsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-facets', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-facets', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.FacetsSenecaPlugin = FacetsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new FacetsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=FacetsSenecaPlugin.js.map