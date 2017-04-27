let async = require('async');
let assert = require('chai').assert;

import { IFacetsPersistence } from '../../src/persistence/IFacetsPersistence';
import { FacetV1 } from '../../src/data/version1/FacetV1';
    
export class FacetsPersistenceFixture {
    private _persistence: IFacetsPersistence;
    
    constructor( persistence) {
        assert.isNotNull( persistence);
        this._persistence =  persistence;
    }

    public testAddAndRemoveFacets(done) {
        async.series([
        // Add facet 1
            (callback) => {
                this._persistence.addOne(
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
                this._persistence.removeOne(
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
                this._persistence.getPageByGroup(
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
                this._persistence.deleteByGroup(
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
                this._persistence.getPageByGroup(
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
    }

}
