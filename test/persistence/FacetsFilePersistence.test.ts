import { ConfigParams } from 'pip-services3-commons-node';

import { FacetsFilePersistence } from '../../src/persistence/FacetsFilePersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsFilePersistence', ()=> {
    let persistence: FacetsFilePersistence;
    let fixture: FacetsPersistenceFixture;
    
    setup((done) => {
        persistence = new FacetsFilePersistence('./data/facets.test.json');

        fixture = new FacetsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });
});