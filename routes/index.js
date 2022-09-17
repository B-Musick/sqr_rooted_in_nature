// 5. Set up root routes
var express = require('express');
var router = express.Router();
passport = require('passport');
var User = require('../models/user');

router.get('/', (req, res) => {
    res.render('landing');
});

module.exports = router;
