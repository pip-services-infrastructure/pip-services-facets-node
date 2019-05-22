import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let FacetsMongooseSchema = function(collection?: string) {
    collection = collection || 'facets';

    let schema = new Schema(
        {
            group: { type: String, required: false },
            name: { type: String, required: false },
            count: { type: Number, required: false , 'default': 0 },
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
