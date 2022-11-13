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

// Use these variables to pass into the ejs file to dynamically create the register form
reg_template_vars = {
    inputs: ['username', 'password', 'email','firstname','lastname','iconimage'],
    title: 'become rooted in nature',
    backLink: '/',
    action: '/register',
    edit: false
}

// REGISTER SHOW ROUTE
router.get('/register', (req, res) => {
    process.env.NODE_ENV == 'test' ?
        res.json(reg_template_vars) : res.render('partials/form', reg_template_vars)
});

// REGISTER NEW ROUTE
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, iconimage:req.body.iconimage });

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

router.get('/account/:id', (req, res) => {
    
    var user_values = { 
        inputs: ['username', 'email', 'firstname', 'lastname', 'iconimage'],
        title: 'Account Info',
        backLink: '/',
        action: '/account/'+req.params.id,
        // If there is a query saying edit, then edit the user
        edit: req.query.edit ? req.query.edit: false
    };

    process.env.NODE_ENV == 'test' ?
        res.json(user_values) : res.render('account', user_values)
});

// UPDATE ROUTE
router.put('/account/:id', (req, res) => {
    // Plant.findByIdAndUpdate(req.params.id, req.body.plant, (err, updatedPlant) => {
    //     err ? res.redirect('plants') : res.redirect('/plants/' + req.params.id);
    // });
    var user_values = {
        inputs: ['username', 'email', 'firstname', 'lastname', 'iconimage'],
        title: 'Account Info',
        backLink: '/',
        action: '/account/' + req.params.id,
        // If there is a query saying edit, then edit the user
        edit: req.query.edit ? req.query.edit : false
    };

    User.findByIdAndUpdate(req.params.id, req.body, (err, foundUser) => {
        err ? res.redirect('/account/' + req.params.id) :
            process.env.NODE_ENV == 'test' ?
                res.json({ foundUser }) :
                res.redirect('/account/' + req.params.id);
    });
});

// // UPDATE ROUTE
// router.put('/account/:id', (req, res) => {
//     // Plant.findByIdAndUpdate(req.params.id, req.body.plant, (err, updatedPlant) => {
//     //     err ? res.redirect('plants') : res.redirect('/plants/' + req.params.id);
//     // });
//     var user_values = {
//         inputs: ['username', 'email', 'firstname', 'lastname', 'iconimage'],
//         title: 'Account Info',
//         backLink: '/',
//         action: '/account/'+req.params.id,
//         // If there is a query saying edit, then edit the user
//         edit: req.query.edit ? req.query.edit : false
//     };
//     Plant.findByIdAndUpdate(req.params.id, req.body, (err, foundPlant) => {
//         err ? res.redirect('account') :
//             process.env.NODE_ENV == 'test' ?
//                 res.json({ foundPlant }) :
//                 res.redirect('/plants/' + req.params.id);
//     });
// });

module.exports = router;
