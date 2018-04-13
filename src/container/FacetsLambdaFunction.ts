import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { FacetsServiceFactory } from '../build/FacetsServiceFactory';

export class FacetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("facets", "Faceted search function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-facets', 'controller', 'default', '*', '*'));
        this._factories.add(new FacetsServiceFactory());
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }
}

export const handler = new FacetsLambdaFunction().getHandler();