var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    iconimage: String
});

// Add the methods to the user
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);