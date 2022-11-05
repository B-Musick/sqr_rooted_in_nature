
/*****************
 * /plants
 * 
 ******************/
var express = require('express');
var router = express.Router();
dotenv = require('dotenv')

// SCHEMA MODEL IMPORTS
var Plant = require('../models/plant');

// IMPORT MIDDLEWARE
var middleware = require('../middleware');

// .env FILE SETUP (process.env.VAR)
dotenv.config();

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
        let filterBarSelectors = ["familyname", "genus"];

        let filterValues = {
            "familyname":["Aceraceae", "Populaceae"],
            "genus":["Populous"]
        }
        let families = ["Aceraceae", "Populaceae"];

        let geni = ["Populous"]

        let query = {} // Used in find() method to find value from database

        if (Object.entries(req.query).length !== 0) {
            // req.query from the query string ex. "?familyname=Aceraceae&genus=Populous"
            // Filter by values given from the dropdowns
            Object.keys(req.query).forEach(key => {
                if (req.query[key] !== "none") {
                    // If value is given to filter by, add it to query
                    query[key] = req.query[key];
                }
            })
            Plant.find(query, (err, foundPlants) => {
                err ? console.log(err) : // If test then return JSON, otherwise ejs page
                    process.env.NODE_ENV == 'test' ?
                        res.json({ foundPlants }) :
                        res.render('plants/index', {
                            plants: foundPlants,
                            families, filterBarSelectors,
                            filterValues, 
                            geni, query
                        })
            })
        } else {
            process.env.NODE_ENV == 'test' ?
                res.json({ foundPlants }) :
                res.render('plants/index', {
                    plants: foundPlants,
                    currentUser: req.user,
                    filterValues, 

                    families, filterBarSelectors, geni, query
                })
        }
        // err ? console.log(err) : res.render('plants/index', { plants: foundPlants, currentUser: req.user });
    });
});

/**
 * JSON route which will return the data in JSON form
 * - Useful for testing to make sure data is obtatined from the DB
 */
router.get('/json', (req, res) => {
    Plant.find({}, (err, foundPlants) => {
        err ? console.log(err) : res.send(foundPlants);
    });
});

// NEW ROUTE (plants/new)
router.get('/new', middleware.isLoggedIn, (req, res) => {
    // res.render('plants/new')
    let inputs = ['genus', 'species', 'common name', 'family name', 'sepal count',
        'pedal count', 'stamen count', 'carpel count', 'description', 'image url']
        
    let template_vars = {
        inputs, title: 'create new plant',
        backLink: '/',
        action: '/plants',
        edit: false
    }
    process.env.NODE_ENV == 'test' ? res.json(template_vars) : // If test then load json
        res.render('partials/form', template_vars)
});

// CREATE ROUTE (/plants)
router.post('/', middleware.isLoggedIn, (req, res) => {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newPlant = {
    //     genus: req.body.genus,
    //     species: req.body.species,
    //     image: req.body.image,
    //     author: author, // Created author before this var
    //     sepals: req.body.sepals,
    //     pedals: req.body.pedals,
    //     stamens: req.body.stamens,
    //     carpels: req.body.carpels,
    //     commonName: req.body.commonName,
    //     description: req.body.description,
    //     family: req.body.family
    // };

    // Plant.create(newPlant, (err, plant) => {
    //     err ? console.log(err) : res.redirect('/plants');
    // });
    var newPlant = {
        genus: req.body.genus,
        species: req.body.species,
        imageurl: req.body.imageurl,
        author: author,
        sepalcount: req.body.sepalcount,
        pedalcount: req.body.pedalcount,
        stamencount: req.body.stamencount,
        carpelcount: req.body.carpelcount,
        commonname: req.body.commonname,
        description: req.body.description,
        familyname: req.body.familyname
    };

    Plant.create(newPlant, (err, plant) => {
        err ? console.log(err) : process.env.NODE_ENV == 'test' ? res.json({ plant }) : res.redirect('/plants');
    });
});

// SHOW ROUTE (/plants/show)
router.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (err, foundPlant) => {
        err ? console.log(err) :
            process.env.NODE_ENV == 'test' ?
                res.json({ plant: foundPlant }) :
                res.render('plants/show', { plant: foundPlant })
    })
});

// EDIT ROUTE - form submits to update, pass plant were editing to the form
router.get('/:id/edit', middleware.checkPlantOwnership, (req, res) => {
    // Plant.findById(req.params.id, (err, foundPlant) => {
    //     err ? res.redirect('/plants') : res.render('plants/edit', { plant: foundPlant });
    // });
    let inputs = ['genus', 'species', 'common name', 'family name', 'sepal count',
        'pedal count', 'stamen count', 'carpel count', 'description', 'image url']
    Plant.findById(req.params.id, (err, foundPlant) => {
        template_vars = {
            title: 'create new plant',
            backLink: '/',
            action: '/plants/' + req.params.id + '?_method=PUT',
            inputs,
            plant: foundPlant,
            edit: true
        }
        err ? res.redirect('/plants') :
            process.env.NODE_ENV == 'test' ?
                res.json(template_vars) :
                res.render('partials/form', template_vars);
    });
});

// UPDATE ROUTE
router.put('/:id', middleware.checkPlantOwnership, (req, res) => {
    // Plant.findByIdAndUpdate(req.params.id, req.body.plant, (err, updatedPlant) => {
    //     err ? res.redirect('plants') : res.redirect('/plants/' + req.params.id);
    // });
    Plant.findByIdAndUpdate(req.params.id, req.body, (err, foundPlant) => {
        err ? res.redirect('plants') :
            process.env.NODE_ENV == 'test' ?
                res.json({ foundPlant }) :
                res.redirect('/plants/' + req.params.id);
    });
});

// DELETE ROUTE
router.delete('/:id', middleware.checkPlantOwnership, (req, res) => {
    // Plant.findByIdAndRemove(req.params.id, err => {
    //     err ? res.redirect('/plants') : res.redirect('/plants');
    // });
    Plant.findByIdAndRemove(req.params.id, err => {
        err ? res.redirect('/plants') :
            process.env.NODE_ENV == 'test' ?
                res.json('deleted plant') :
                res.redirect('/plants');
    });
});

module.exports = router;