let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { FacetV1 } from '../../../src/data/version1/FacetV1';
import { FacetsMemoryPersistence } from '../../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../../src/logic/FacetsController';
import { FacetsSenecaServiceV1 } from '../../../src/services/version1/FacetsSenecaServiceV1';


suite('FacetsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: FacetsSenecaServiceV1;
    let persistence: FacetsMemoryPersistence;
    let controller: FacetsController;

    suiteSetup((done) => {
        persistence = new FacetsMemoryPersistence();
        controller = new FacetsController();

        service = new FacetsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-facets', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('Add and Remove Facets', (done) => {
        async.series([
        // Add facet 1
            (callback) => {
                seneca.act(
                    {
                        role: "facets",
                        cmd: "add_facet",
                        group: "test",
                        name: "group1"
                    },
                    (err, facet) => {
                        assert.isNull(err);

                        assert.equal(facet.group, "test");
                        assert.equal(facet.name, "group1");
                        assert.equal(facet.count, 1);

                        callback();
                    }
                );
            },
        // Remove facet 1
            (callback) => {
                seneca.act(
                    {
                        role: "facets",
                        cmd: "remove_facet",
                        group: "test",
                        name: "group2"
                    },
                    (err, facet) => {
                        assert.isNull(err);

                        assert.equal(facet.group, "test");
                        assert.equal(facet.name, "group2");
                        assert.equal(facet.count, 0);

                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                seneca.act(
                    {
                        role: "facets",
                        cmd: "get_facets_by_group",
                        group: "test"
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Delete facets
            (callback) => {
                seneca.act(
                    {
                        role: "facets",
                        cmd: "delete_facets_by_group",
                        group: "test"
                    },
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                seneca.act(
                    {
                        role: "facets",
                        cmd: "get_facets_by_group",
                        group: "test"
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});