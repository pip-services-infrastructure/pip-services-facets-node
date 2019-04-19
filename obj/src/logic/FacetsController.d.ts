import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsController } from './IFacetsController';
export declare class FacetsController implements IConfigurable, IReferenceable, ICommandable, IFacetsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getFacetsByGroup(correlationId: string, group: string, paging: PagingParams, callback: (err: any, page: DataPage<FacetV1>) => void): void;
    addFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    removeFacet(correlationId: string, group: string, name: string, callback: (err: any, item: FacetV1) => void): void;
    deleteFacetsByGroup(correlationId: string, group: string, callback: (err: any) => void): void;
    clear(correlationId: string, callback?: (err: any) => void): void;
}
