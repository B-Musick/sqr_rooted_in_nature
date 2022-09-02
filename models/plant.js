var mongoose = require('mongoose');

var plantSchema = new mongoose.Schema({
    genus: String,
    species: String,
});

module.exports = mongoose.model('Plant', plantSchema);
