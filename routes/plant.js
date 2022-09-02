var express = require('express');
var router = express.Router();

// a. Set up index rout
router.get('/index', (req, res) => {
    res.render('plants/index');
});
