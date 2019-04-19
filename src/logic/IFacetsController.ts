import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICleanable } from 'pip-services3-commons-node';

import { FacetV1 } from '../data/version1/FacetV1';

export interface IFacetsController {
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void;

    addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void;

    removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void;

    deleteFacetsByGroup(correlationId: string, group: string,
        callback: (err: any) => void): void;

    clear(correlationId: string, callback?: (err: any) => void): void;
}
