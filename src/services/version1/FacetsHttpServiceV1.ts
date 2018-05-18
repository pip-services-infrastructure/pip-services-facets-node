import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class FacetsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/facets');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-facets', 'controller', 'default', '*', '1.0'));
    }
}