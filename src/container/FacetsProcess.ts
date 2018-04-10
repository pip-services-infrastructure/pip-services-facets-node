import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { FacetsServiceFactory } from '../build/FacetsServiceFactory';

export class FacetsProcess extends ProcessContainer {

    public constructor() {
        super("facets", "Faceted search microservice");
        this._factories.add(new FacetsServiceFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
