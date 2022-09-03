var express = require('express');
var router = express.Router();

// SCHEMA MODEL IMPORTS
var Plant = require('../models/plant');

// a. Set up index rout
router.get('/index', (req, res) => {
    res.render('plants/index');
});

// NEW ROUTE (plants/new)
router.get('/new',  (req, res) => {
    res.render('plants/new')
});

router.post('/', (req, res) => {
    var newPlant = { genus: req.body.genus, species: req.body.species };
    // Do something with the form data
    // var newPlant = {
    //     genus: req.body.genus,
    //     species: req.body.species,
    //     image: req.body.image,
    //     author: author,
    //     sepals: req.body.sepals,
    //     pedals: req.body.pedals,
    //     stamens: req.body.stamens,
    //     carpels: req.body.carpels,
    //     commonName: req.body.commonName,
    //     description: req.body.description,
    //     family: req.body.family
    // };
    Plant.create(newPlant, (err, plant) => {


        // Then redirect to the plants/index page
        err ? console.log(err) : res.redirect('/plants');
    });
});

/**
 * The find() method will return all the plants from the database since ‘{}’ was used as the first parameter which denotes returning all the items
 * Then in the callback, we pass 
	- err as the first parameter will return any errors that occur
	- foundPlants as the second param will return all the plants from the database
- Then need to catch any errors, if no errors then need to render the page and pass in the items from the database which were found (pass in object with the key being the thing passed into the file and the value being the current variable holding the foundItems

 */
router.get('/', (req, res) => {
    Plant.find({}, (err, foundPlants) => {
        err ? console.log(err) : res.render('plants/index', { plants: foundPlants });
    });
});

router.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (err, showPlant) => {
        err ? console.log(err) : res.render('plants/show', { plant: showPlant });
    })
});

module.exports = router;