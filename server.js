// 1. Set up web application framework, will be used to create routes with Router
var express = require('express');
var app = express();

// 2. Set up view engine, this will make it so you don’t need to add the file extension ‘.ejs’ to the files
app.set('view engine', 'ejs');

// 5. Import the routes
var indexRoutes = require('./routes/index');

// PREVENTS ANY BACKLASH FROM DIRECTORY CHANGES
app.use(express.static(__dirname + "/public"));

// Integrate the routes
app.use('/', indexRoutes);

// 3. Set up the listen route with the server location and callback function within printing the server has started to console
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = app

