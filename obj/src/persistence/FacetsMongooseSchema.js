"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.FacetsMongooseSchema = function (collection) {
    collection = collection || 'facets';
    let schema = new mongoose_1.Schema({
        group: { type: String, required: false },
        name: { type: String, required: false },
        count: { type: Number, required: false, 'default': 0 },
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=FacetsMongooseSchema.js.map