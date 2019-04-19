let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { FacetV1 } from '../../src/data/version1/FacetV1';
import { FacetsMemoryPersistence } from '../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../src/logic/FacetsController';

suite('FacetsController', ()=> {
    let persistence: FacetsMemoryPersistence;
    let controller: FacetsController;

    suiteSetup(() => {
        persistence = new FacetsMemoryPersistence();
        controller = new FacetsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('Add and Remove Facets', (done) => {
        async.series([
        // Add facet 1
            (callback) => {
                controller.addFacet(
                    null, "test", "group1",
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
                controller.removeFacet(
                    null, "test", "group2",
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
                controller.getFacetsByGroup(
                    null,
                    'test',
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Delete facets
            (callback) => {
                controller.deleteFacetsByGroup(
                    null,
                    'test',
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                controller.getFacetsByGroup(
                    null,
                    'test',
                    null,
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