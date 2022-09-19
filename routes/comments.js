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
                    // Add username to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    // Save comment
                    comment.save();
                    plant.comments.push(comment);

                    plant.save();
                    res.redirect('/plants/' + plant._id);
                }
            });
        }
    })
});

// EDIT ROUTE
router.get('/plants/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        err ? console.log(err) : res.render('comments/edit', { plant_id: req.params.id, comment: foundComment });
    });
});

// UPDATE ROUTE
router.put('/plants/:id/comments/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    // (id to find by, data to update with, callback)
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        err ? res.redirect('back') : res.redirect('/plants/' + req.params.id);
    });
});

// DELETE ROUTE
router.delete('/plants/:id/comments/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {

        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/plants/' + req.params.id);
        }
    });
});

module.exports = router;