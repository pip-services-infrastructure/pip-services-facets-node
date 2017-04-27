let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { FacetV1 } from '../data/version1/FacetV1';
import { IFacetsPersistence } from '../persistence/IFacetsPersistence';
import { IFacetsController } from './IFacetsController';
import { FacetsCommandSet } from './FacetsCommandSet';

export class FacetsController implements IConfigurable, IReferenceable, ICommandable, IFacetsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-facets:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(FacetsController._defaultConfig);
    private _persistence: IFacetsPersistence;
    private _commandSet: FacetsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IFacetsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new FacetsCommandSet(this);
        return this._commandSet;
    }
    
    public getFacetsByGroup(correlationId: string, group: string, paging: PagingParams,
        callback: (err: any, page: DataPage<FacetV1>) => void): void {
        this._persistence.getPageByGroup(correlationId, group, paging, callback);
    }

    public addFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        this._persistence.addOne(correlationId, group, name, callback);
    }

    public removeFacet(correlationId: string, group: string, name: string,
        callback: (err: any, item: FacetV1) => void): void {
        this._persistence.removeOne(correlationId, group, name, callback);
    }

    public deleteFacetsByGroup(correlationId: string, group: string,
        callback: (err: any) => void): void {
        this._persistence.deleteByGroup(correlationId, group, callback);
    }

    public clear(correlationId: string, callback?: (err: any) => void): void {
        this._persistence.clear(correlationId, callback);
    }

}
