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

reg_template_vars = {
    inputs: ['username', 'password', 'email'],
    title: 'become rooted in nature',
    backLink: '/',
    action: '/register',
    edit: false
}

// REGISTER SHOW ROUTE
// router.get('/register', (req, res) => res.render('register'));
// REGISTER SHOW ROUTE
router.get('/register', (req, res) => {
    process.env.NODE_ENV == 'test' ?
        res.json(reg_template_vars) : res.render('partials/form', reg_template_vars)
});

// // REGISTER NEW ROUTE
// router.post('/register', (req, res) => {
//     var newUser = new User({ username: req.body.username });

//     User.register(newUser, req.body.password, (err, user) => {
//         // This method coming from passportLocalMongoose, password is stored as hash
//         if (err) {
//             // Error occurs in registration (or user already exists)
//             console.log(err);
//             return res.render('register');
//         } else {
//             passport.authenticate('local')(req, res, () => {
//                 // When user is registered successfully
//                 console.log("Created user"+req.body.username);
//                 res.redirect('/plants');
//             });
//         }
//     })
// });

// REGISTER NEW ROUTE
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username, email: req.body.email });


    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            // Error occurs in registration
            console.log(err);
            return res.render('partials/form', reg_template_vars);
        } else {
            passport.authenticate('local')(req, res, () => {
                // When user is registered successfully
                console.log('Successfully signed up!')
                process.env.NODE_ENV == 'test' ?
                    res.json(user) : res.redirect('/');
            });
        }
    })
})


log_template_vars = {
    inputs: ['username', 'password'],
    title: 'Login',
    backLink: '/',
    action: '/login',
    edit: false
}

// LOGIN SHOW ROUTE - Uses flash message error 
router.get('/login', (req, res) => {
    process.env.NODE_ENV == 'test' ?
        res.json(log_template_vars) : res.render('partials/form', log_template_vars)
});

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
router.get('/logout', (req, res)=> {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/plants');
    });
});
module.exports = router;
