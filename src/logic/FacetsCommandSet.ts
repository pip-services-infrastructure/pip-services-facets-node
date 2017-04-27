let _ = require('lodash');

import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { FacetV1Schema } from '../data/version1/FacetV1Schema';
import { IFacetsController } from './IFacetsController';

export class FacetsCommandSet extends CommandSet {
    private _logic: IFacetsController;

    constructor(logic: IFacetsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetFacetsByGroupCommand());
		this.addCommand(this.makeAddFacetCommand());
		this.addCommand(this.makeRemoveFacetCommand());
		this.addCommand(this.makeDeleteFacetsByGroupCommand());
		this.addCommand(this.makeClearCommand());
    }

	private makeGetFacetsByGroupCommand(): ICommand {
		return new Command(
			"get_facets_by_group",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let group = args.getAsNullableString("group");
				let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getFacetsByGroup(correlationId, group, paging, callback);
            }
		);
	}

	private makeAddFacetCommand(): ICommand {
		return new Command(
			"add_facet",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withRequiredProperty('name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let group = args.getAsNullableString("group");
                let name = args.getAsNullableString("name");
                this._logic.addFacet(correlationId, group, name, callback);
            }
		);
	}

	private makeRemoveFacetCommand(): ICommand {
		return new Command(
			"remove_facet",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String)
				.withRequiredProperty('name', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let group = args.getAsNullableString("group");
                let name = args.getAsNullableString("name");
                this._logic.removeFacet(correlationId, group, name, callback);
            }
		);
	}

	private makeDeleteFacetsByGroupCommand(): ICommand {
		return new Command(
			"delete_facets_by_group",
			new ObjectSchema(true)
				.withRequiredProperty('group', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let group = args.getAsNullableString("group");
                this._logic.deleteFacetsByGroup(correlationId, group, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeClearCommand(): ICommand {
		return new Command(
			"clear",
			new ObjectSchema(true),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				this._logic.clear(correlationId, (err) => {
					callback(err, null);
				});
            }
		);
	}

}