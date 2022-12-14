var mongoose = require('mongoose'),
    Comment = require('./models/comment'),
    Plant = require('./models/plant');

// Starter seed data (plant objects)
var data = [
    {
            genus: 'Populous',
            species: 'Tremuloides',
            image: 'imageUrl',
            author: 'Brendan',
            sepals: '5',
            pedals: '5',
            stamens: '5',
            carpels: '5',
            commonName: 'Trembling Aspen',
            description: 'Common tree',
            family: 'Betula',
            // id: 1,
            username: 'bendan'
    }
];

function plantSeedDB() {
    Plant.remove({}, (err) => {
        // Remove any data thats in the database currently (loops through entire aray to remove)
        if (err) {
            // If not removed then print error
            console.log(err);
        }
        // If removed then print it out
        console.log('Removed Plants from Database!');

        data.forEach((seed) => {
            // For each seed object, create a plant out of it
            Plant.create(seed, (err, plant) => {
                if (err) {
                    console.log(err);
                }
                // If the seed is added then print it was added
                console.log('Added Plant!');
                console.log(seed)

                // Comment.create({
                //     user: 'Brendan', // Fake user
                //     comment: 'I enjoy this plant' // Fake comment
                // }, (err, createdComment) => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         // Push comment to the current plant objects comment
                //         plant.comments.push(createdComment);
                //         plant.save(); // Save this comment
                //         console.log('Added a comment!'); // PRint that it worked
                //     }
                // });

            });
        });
    });
};

module.exports = plantSeedDB;