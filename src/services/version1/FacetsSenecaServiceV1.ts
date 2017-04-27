import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class FacetsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('facets');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-facets', 'controller', 'default', '*', '1.0'));
    }
}