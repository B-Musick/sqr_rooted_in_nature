var express = require('express');
var router = express.Router();

// SCHEMA MODEL IMPORTS
var Plant = require('../models/plant');
var PlantKey = require('../models/plantkey');

// IMPORT MIDDLEWARE
var middleware = require('../middleware');

// IMPORT PLANT KEYS
var fs = require('fs');
var woodyKey = JSON.parse(fs.readFileSync('./public/scripts/plant_keys/woody.json', 'utf8'));
var aquaticKey = JSON.parse(fs.readFileSync('./public/scripts/plant_keys/aquatic.json', 'utf8'));
var fernKey = JSON.parse(fs.readFileSync('./public/scripts/plant_keys/ferns.json', 'utf8'));


// Import DICTIONARY
let dictionary = require('../public/scripts/plants/dictionary');

/************************ KEYS *********************************/

// /****** FAMILY KEYS *******/
// // Used to hold all keys
let keys = { ferns: fernKey, woody: woodyKey, aquatic: aquaticKey };

router.get('/families', (req, res) => {
    let families = ['Locopodiaceae'];
    res.render('plants/families/index', { families });
});

router.get('/families/:family', (req, res) => {
    res.render('plants/families/family', { family: req.params.family });
});

router.get('/groups', (req, res) => {
    let groups = ['ferns'];
    res.render('plants/groups/index', { groups });
});

router.get('/groups/:group', (req, res) => {
    res.render('plants/groups/show.ejs', { group: req.params.group });
});


router.get('/keys', (req, res) => {
    let groups = { ferns: { name: 'Ferns And Allies', group: 'ferns', families: ['Isoetaceae'] }, woody: { name: 'Woody Plants', group: 'woody', families: ['Isoetaceae'] }, aquatic: { name: 'Aquatic Plants', group: 'aquatic', families: ['Isoetaceae'] } };

    // let groups = { woody: { name: 'Woody Plants', group: 'woody', families: ['Isoetaceae'] } };

    res.render('plants/keys/index', { groups })
})

router.get('/keys/create', (req, res) => {
    // This route allows user to submit a file and a key will be created
    res.render('plants/keys/create')
});

router.post('/keys', (req,res)=>{
    var newPlantKey = {
        key: JSON.parse(req.body.jsonKey)
    }

    PlantKey.create(newPlantKey, (err, plantKey) => {
        err ? console.log(err) : process.env.NODE_ENV == 'test' ? res.json({ plantKey }) : res.redirect('/plants/keys');
    });
});

router.get('/keys/:group', (req, res) => {
    let key_val = req.query.key_val || "01"; // Take the query parameter and access the binomial key
    console.log(key_val)
    let group = req.params.group;
    console.log(group)
    let key_obj = keys[group];
    console.log(key_obj)
    // Get the sentences
    let a_sentence = key_obj['key'][key_val]['a']['sentence'];
    let b_sentence = key_obj['key'][key_val]['b']['sentence'];

    // Split sentences into array to loop through
    let split_a_sentence = a_sentence.split(` `);
    let split_b_sentence = b_sentence.split(` `);

    // The final linke to the next place
    let a_result = key_obj['key'][key_val]['a']['result'];
    let b_result = key_obj['key'][key_val]['b']['result'];
    console.log(a_result)
    console.log(split_a_sentence)


    res.render('plants/keys/group_keys', { key_obj, group, key_val, a_result, b_result, a_sentence: split_a_sentence, b_sentence: split_b_sentence, dictionary });
});

module.exports = router;
