var mongoose = require('mongoose');

var plantkeySchema = new mongoose.Schema({
    key:JSON
});

module.exports = mongoose.model('PlantKey', plantkeySchema);