var mongoose = require('mongoose'),
    Plant = require('./models/plant');

var data = [
    {
        genus: 'Taraxicum',
        species: 'officianalis'
    },
    {
        genus: 'Populus',
        species: 'tremuloides'
    }
];

function plantSeedDB() {
    data.forEach((seed)=>{
        Plant.create(seed, (err, plant)=>{
            if(err){
                console.log(err);
            }

            console.log('Added Plant!');

        });
    }); 
    
};

module.exports = plantSeedDB;