"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const FacetsServiceFactory_1 = require("../build/FacetsServiceFactory");
class FacetsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("facets", "Faceted search function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-facets', 'controller', 'default', '*', '*'));
        this._factories.add(new FacetsServiceFactory_1.FacetsServiceFactory());
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.FacetsLambdaFunction = FacetsLambdaFunction;
exports.handler = new FacetsLambdaFunction().getHandler();
//# sourceMappingURL=FacetsLambdaFunction.js.map