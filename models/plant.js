var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
    genus: String,
    species: String,
    imageurl: String,
    commonname: {
        type: String,
        default: 'unknown'
    },
    sepalcount: { 
        type: String, 
        default: '-' 
    },
    pedalcount: { 
        type: String, 
        default: '-' 
    },
    stamencount: { 
        type: String, 
        default: '-' 
    },
    carpelcount: { 
        type: String, 
        default: '-' 
    },
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