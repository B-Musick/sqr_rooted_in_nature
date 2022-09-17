var express = require('express');
var router = express.Router();

var Plant = require('../models/plant');
var Comment = require('../models/comment');

var middleware = require('../middleware');

// NEW ROUTE (plants/:id/comments/new), middleware to check request is authenticated first
router.get('/plants/:id/comments/new', middleware.isLoggedIn, (req, res) => {
    // Take the parameter :id and find the associated plant
    Plant.findById(req.params.id, (err, foundPlant) => {
        err ? console.log(err) : res.render('comments/new', { plant: foundPlant });
    });
});

// CREATE ROUTE (plants/:id/comments)
router.post('/plants/:id/comments', middleware.isLoggedIn,(req, res) => {
    Plant.findById(req.params.id, (err, plant) => {
        if (err) {
            console.log("Err post: " + err);
            res.redirect('/plants');
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    
                    comment.save();
                    plant.comments.push(comment);

                    plant.save();
                    res.redirect('/plants/' + plant._id);
                }
            });
        }
    })
});


module.exports = router;