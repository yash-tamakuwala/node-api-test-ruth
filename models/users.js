const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_updated'
    },
    versionKey: false
};

let usersSchema = new Schema({
    name: {
        type: String,
        default: 'name'
    },
    username: {
        type: String,
        default: 'username'
    },
}, schemaOptions);

usersSchema.statics = {
    valueExists(query) {
        return this.findOne(query).then(result => result);
    }
};

var users = mongoose.model('users', usersSchema);
module.exports = users;