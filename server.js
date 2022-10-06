// 1. Set up web application framework, will be used to create routes with Router
var express = require('express'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    mongoose = require('mongoose'),
    
    // METHOD-OVERRIDE - used to update and delete objects from database
    methodOverride = require('method-override');
var bodyParser = require('body-parser');

// 2. Set up view engine, this will make it so you don’t need to add the file extension ‘.ejs’ to the files
app.set('view engine', 'ejs');

// 5. Import the routes
var indexRoutes = require('./routes/index'),
    plantKeyRoutes = require('./routes/plant_keys'),
    plantRoutes = require('./routes/plants'),
    commentRoutes = require('./routes/comments');

// SCHEMA MODEL IMPORTS
var Plant = require('./models/plant');
var Comment = require('./models/comment');
var User = require('./models/user');

// IMPORT SEED
var plantSeedDB = require('./plantSeed.js');

/*************************** PASSPORT CONFIGURATION ******************************/

// SESSION
/* Makes HTTTP not stateless and saves info about user secretly
 * If user not logged in then cant see secret pages
 * Saves session data in cookie (piece of data sent to users browser, tells if requests
 * came from the same server)
 * express-session creates session object with unique key where data is stored
 *      - request.sessionID will return ID
 */


app.use(require('express-session')({
    secret: 'You are the coolest',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Read session, take data from session thats encoded and unencode it(deserialize), 
//serialize will re encode it, serialize and put back in the session
// passportLocalMongoose contains these methods
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// APPLY currentUser FROM PLANT INDEX ROUTE TO ALL ROUTES SINCE IN HEADER
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    // Set up locals for error and message
    next(); // This moves to the next middleware route
});

// METHOD-OVERRIDE (update and delete from database)
app.use(methodOverride('_method'));

// Connect to the database running on port 27017
mongoose.connect("mongodb://localhost:27017/rin_refactor"), { useNewUrlParser: true }; 


// 12. - Takes request body and parses into JS object which will give the input ‘name’ attribute a value which is input by the user. (used to get form body)
// Make sure it is the first above all other app.use methods, otherwise it wont allow creation of schema
app.use(bodyParser.urlencoded({ extended: true }));

// PREVENTS ANY BACKLASH FROM DIRECTORY CHANGES
app.use(express.static(__dirname + "/public"));

// Integrate the routes
app.use('/', indexRoutes);
app.use('/plants',plantKeyRoutes);
app.use('/plants', plantRoutes);
app.use('/', commentRoutes);

// CALL SEED
// plantSeedDB();

// 3. Set up the listen route with the server location and callback function within printing the server has started to console
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = app

