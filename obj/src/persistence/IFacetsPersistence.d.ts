import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FacetV1 } from '../data/version1/FacetV1';
export interface IFacetsPersistence {
    getPageByGroup(correlationId: string, group: string, paging: PagingParams, callback: (err: any, page: DataPage<FacetV1>) => void): void;
    addOne(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    removeOne(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    deleteByGroup(correlationId: string, group: string, callback: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
