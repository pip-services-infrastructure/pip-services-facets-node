import { YamlConfigReader } from 'pip-services-commons-node';

import { FacetsMongoDbPersistence } from '../../src/persistence/FacetsMongoDbPersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsMongoDbPersistence', ()=> {
    let persistence: FacetsMongoDbPersistence;
    let fixture: FacetsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new FacetsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new FacetsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });
});