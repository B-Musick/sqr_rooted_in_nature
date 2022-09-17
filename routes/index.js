// 5. Set up root routes
var express = require('express');
var router = express.Router();
passport = require('passport');
var User = require('../models/user');

router.get('/', (req, res) => {
    res.render('landing');
});

/* ==========================================================================
                        AUTHORIZATION ROUTES
   ========================================================================== */

// REGISTER SHOW ROUTE
router.get('/register', (req, res) => res.render('register'));

// REGISTER NEW ROUTE
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });

    User.register(newUser, req.body.password, (err, user) => {
        // This method coming from passportLocalMongoose, password is stored as hash
        if (err) {
            // Error occurs in registration (or user already exists)
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, () => {
                // When user is registered successfully
                console.log("Created user"+req.body.username);
                res.redirect('/plants');
            });
        }
    })
});

// LOGIN SHOW ROUTE - Uses flash message error 
router.get('/login', (req, res) => res.render('login'));

/**
 * LOGIN POST ROUTE
 * 
 * - To post data and make a login
 * - Notice that for register things are done to create user in the post route before 
 * authenticate is called. But in the login route, the user is presumed to exist already  */ 

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }
), (req, res) => { });

// LOGOUT ROUTE
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/plants');

});
module.exports = router;
