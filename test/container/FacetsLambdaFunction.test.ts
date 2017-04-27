let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { FacetV1 } from '../../src/data/version1/FacetV1';
import { FacetsMemoryPersistence } from '../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../src/logic/FacetsController';
import { FacetsLambdaFunction } from '../../src/container/FacetsLambdaFunction';


suite('FacetsLambdaFunction', ()=> {
    let lambda: FacetsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-facets:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-facets:controller:default:default:1.0'
        );

        lambda = new FacetsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Add and Remove Facets', (done) => {
        async.series([
        // Add facet 1
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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