import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { FacetsMemoryPersistence } from './FacetsMemoryPersistence';
import { FacetV1 } from '../data/version1/FacetV1';

export class FacetsFilePersistence extends FacetsMemoryPersistence {
	protected _persister: JsonFilePersister<FacetV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<FacetV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}