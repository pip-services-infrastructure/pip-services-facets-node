import { FacetsMemoryPersistence } from '../../src/persistence/FacetsMemoryPersistence';
import { FacetsPersistenceFixture } from './FacetsPersistenceFixture';

suite('FacetsMemoryPersistence', ()=> {
    let persistence: FacetsMemoryPersistence;
    let fixture: FacetsPersistenceFixture;
    
    setup((done) => {
        persistence = new FacetsMemoryPersistence();
        fixture = new FacetsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('Add and Remove Facets', (done) => {
        fixture.testAddAndRemoveFacets(done);
    });

});