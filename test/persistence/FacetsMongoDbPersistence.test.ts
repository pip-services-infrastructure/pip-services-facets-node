let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { FacetsMongoDbPersistence } from '../../src/persistence/FacetsMongoDbPersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsMongoDbPersistence', ()=> {
    let persistence: FacetsMongoDbPersistence;
    let fixture: FacetsPersistenceFixture;

    setup((done) => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "facets";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new FacetsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new FacetsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err == null) {
                persistence.clear(null, (err) => {
                    done(err);
                });
            } else {
                done(err);
            }
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });
});