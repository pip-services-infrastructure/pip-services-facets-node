import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { MemoryPersistence } from 'pip-services-data-node';
import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from './IFacetsPersistence';
export declare class FacetsMemoryPersistence extends MemoryPersistence<FacetV1> implements IConfigurable, IFacetsPersistence {
    protected _maxPageSize: number;
    constructor();
    configure(config: ConfigParams): void;
    getPageByGroup(correlationId: string, group: string, paging: PagingParams, callback: (err: any, page: DataPage<FacetV1>) => void): void;
    addOne(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    removeOne(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    deleteByGroup(correlationId: string, group: string, callback: (err: any) => void): void;
}
