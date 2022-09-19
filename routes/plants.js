var express = require('express');
var router = express.Router();

// SCHEMA MODEL IMPORTS
var Plant = require('../models/plant');
var Comment = require('../models/comment');

// IMPORT MIDDLEWARE
var middleware = require('../middleware');
// const res = require('express/lib/response');

/**
 * Index Route
 * ----------
 * The find() method will return all the plants from the database since ‘{}’ was used as the first parameter which denotes returning all the items
 * Then in the callback, we pass 
	- err as the first parameter will return any errors that occur
	- foundPlants as the second param will return all the plants from the database
- Then need to catch any errors, if no errors then need to render the page and pass in the items from the database which were found (pass in object with the key being the thing passed into the file and the value being the current variable holding the foundItems

 */
router.get('/', (req, res) => {
    Plant.find({}, (err, foundPlants) => {
        err ? console.log(err) : res.render('plants/index', { plants: foundPlants, currentUser: req.user });
    });
});

// NEW ROUTE (plants/new)
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('plants/new')
});

// CREATE ROUTE (/plants)
router.post('/', middleware.isLoggedIn, (req, res) => {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPlant = {
        genus: req.body.genus,
        species: req.body.species,
        image: req.body.image,
        author: author, // Created author before this var
        sepals: req.body.sepals,
        pedals: req.body.pedals,
        stamens: req.body.stamens,
        carpels: req.body.carpels,
        commonName: req.body.commonName,
        description: req.body.description,
        family: req.body.family
    };

    Plant.create(newPlant, (err, plant) => {
        err ? console.log(err) : res.redirect('/plants');
    });
});

// SHOW ROUTE (/plants/show)
router.get('/:id', (req, res) => {
    Plant.findById(req.params.id).populate('comments').exec((err, showPlant) => {
        err ? console.log(err) : res.render('plants/show', { plant: showPlant });
    });
});

// EDIT ROUTE - form submits to update, pass plant were editing to the form
router.get('/:id/edit', middleware.checkPlantOwnership, (req, res) => {
    Plant.findById(req.params.id, (err, foundPlant) => {
        err ? res.redirect('/plants') : res.render('plants/edit', { plant: foundPlant });
    });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkPlantOwnership, (req, res) => {
    Plant.findByIdAndUpdate(req.params.id, req.body.plant, (err, updatedPlant) => {
        err ? res.redirect('plants') : res.redirect('/plants/' + req.params.id);
    });

});

// DELETE ROUTE
router.delete('/:id', middleware.checkPlantOwnership, (req, res) => {
    Plant.findByIdAndRemove(req.params.id, err => {
        err ? res.redirect('/plants') : res.redirect('/plants');
    });
});

module.exports = router;