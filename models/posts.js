const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = require('mongodb').ObjectID;

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_updated'
    },
    versionKey: false
};

let postsSchema = new Schema({
    userid: {
        type: ObjectId,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    ratings: {
        type: Array,
        default: [],
    },
}, schemaOptions);

postsSchema.statics = {
    valueExists(query) {
        return this.findOne(query).then(result => result);
    }
};

var posts = mongoose.model('posts', postsSchema);
module.exports = posts;