var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    author: {
        // Dont want hash and salt, just want important things
        id: {
            // Reference to user model id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Refers to the model
        },
        username: String
    },
    comment: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);