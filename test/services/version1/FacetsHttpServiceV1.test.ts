let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { FacetV1 } from '../../../src/data/version1/FacetV1';
import { FacetsMemoryPersistence } from '../../../src/persistence/FacetsMemoryPersistence';
import { FacetsController } from '../../../src/logic/FacetsController';
import { FacetsHttpServiceV1 } from '../../../src/services/version1/FacetsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);


suite('FacetsHttpServiceV1', ()=> {
    let persistence: FacetsMemoryPersistence;
    let service: FacetsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        persistence = new FacetsMemoryPersistence();
        let controller = new FacetsController();

        service = new FacetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-facets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-facets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-facets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        persistence.clear(null, done);
    });
    
    test('Add and Remove Facets', (done) => {
        async.series([
        // Add facet 1
            (callback) => {
                rest.post("/v1/facets/add_facet",
                    {
                        group: "test",
                        name: "group1"
                    },
                    (err, req, res, facet) => {
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
                rest.post("/v1/facets/remove_facet",
                    {
                        group: "test",
                        name: "group2"
                    },
                    (err, req, res, facet) => {
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
                rest.post("/v1/facets/get_facets_by_group",
                    {
                        group: "test"
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                );
            },
        // Delete facets
            (callback) => {
                rest.post("/v1/facets/delete_facets_by_group",
                    {
                        group: "test"
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Read facets
            (callback) => {
                rest.post("/v1/facets/get_facets_by_group",
                    {
                        group: "test"
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });

});