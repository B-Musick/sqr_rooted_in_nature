var middlewareObj = {};
var Plant = require('../models/plant');
var Comment = require('../models/comment');

middlewareObj.isLoggedIn =
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');

    }

// Use in routes/plant.js to make sure the update is done by a user who created
// Used for added, update and delete plant routes
middlewareObj.checkPlantOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If user is authenticate (logged in)
        Plant.findById(req.params.id, (err, foundPlant) => {
            if (err || !foundPlant) {
                res.redirect('back');
            } else {
                // If the author is the matching current user, render page and pass it the object
                // Otherwise redirect them to the login page
                foundPlant.author.id.equals(req.user.id) ? next() : res.redirect('back');
            }
        });
    } else {
        res.redirect('back');
    }
}
module.exports = middlewareObj
