var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
    // genus: String,
    // species: String,
    // image: String,
    // commonName: {
    //     type: String,
    //     default: 'unknown'
    // },
    // sepals: { type: String, default: '-' },
    // pedals: { type: String, default: '-' },
    // stamens: { type: String, default: '-' },
    // carpels: { type: String, default: '-' },
    // description: {
    //     type: String,
    //     default: 'unknown'
    // },
    // family: {
    //     type: String,
    //     default: 'unknown'
    // },
    genus: String,
    species: String,
    imageurl: String,
    commonname: {
        type: String,
        default: 'unknown'
    },
    sepalcount: { type: String, default: '-' },
    pedalcount: { type: String, default: '-' },
    stamencount: { type: String, default: '-' },
    carpelcount: { type: String, default: '-' },
    description: {
        type: String,
        default: 'unknown'
    },
    familyname: {
        type: String,
        default: 'unknown'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },

});

module.exports = mongoose.model('Plant', plantSchema);