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

    PlantKey.find({}, (err, foundPlantKeys) => {
  
        err ? console.log(err) : process.env.NODE_ENV == 'test' ? res.json({ foundPlantKeys }): res.render('plants/keys/index', { groups,foundPlantKeys });
    });
    // let groups = { woody: { name: 'Woody Plants', group: 'woody', families: ['Isoetaceae'] } };

    
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
    PlantKey.find({}, (err, foundPlantKeys) => {
        // Loop through each key and add an index

        let key_val = req.query.key_val || "01"; // Take the query parameter and access the binomial key

        let group = req.params.group;

        let key_obj = keys[group];

        let extractedData = extractKeyDataFromJSON(key_obj, key_val);

        err ? console.log(err) : process.env.NODE_ENV == 'test' ? res.json({ foundPlantKeys }) : res.render('plants/keys/group_keys', { key_obj, group, key_val, a_result:extractedData.a_result, b_result:extractedData.b_result, a_sentence: extractedData.split_a_sentence, b_sentence: extractedData.split_b_sentence, dictionary });
        
    });
});

/**
 * User created keys 
 */
router.get('/keys/id/:id',(req,res)=>{
    let key_val = req.query.key_val || "01"; // Take the query parameter and access the binomial key

    PlantKey.findById(req.params.id, (err, foundPlantKey) => {
        // Find the associated plant key by id
        key_obj = foundPlantKey.key;

        let extractedData = extractKeyDataFromJSON(key_obj,key_val);
    
        err ? console.log(err) : process.env.NODE_ENV == 'test' ? res.json({ foundPlantKey }) : res.render('plants/keys/group_keys', { key_obj, key_val, a_result:extractedData.a_result, b_result:extractedData.b_result, a_sentence: extractedData.split_a_sentence, b_sentence: extractedData.split_b_sentence, dictionary });
    });
})

/**
 * @definition Will extract key data from the JSON file, including the a and b sentences, 
 * it will split these sentences into array so that any special terms can be made into a tooltip.
 * The results are extracted as well for when the user chooses 'a' they will go to the 
 * 'a' result, same for the 'b' result
 * 
 * @param {Object} key_obj This is the object containing the plant key JSON 
 * @param {Integer} key_val This contains the value of the location in the binomial key to go 
 *                          to within the JSON
 */
function extractKeyDataFromJSON(key_obj,key_val){
    let returnData = {}

    // Get the sentences to split
    a_sentence = key_obj['key'][key_val]['a']['sentence'];
    b_sentence = key_obj['key'][key_val]['b']['sentence'];

    // Split sentences into array to loop through
    returnData['split_a_sentence'] = a_sentence.split(` `);
    returnData['split_b_sentence'] = b_sentence.split(` `);

    // The final linke to the next place
    returnData['a_result'] = key_obj['key'][key_val]['a']['result'];
    returnData['b_result'] = key_obj['key'][key_val]['b']['result'];

    return returnData;
}
module.exports = router;
