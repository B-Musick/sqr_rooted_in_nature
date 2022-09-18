# Requirements
- npm
- node

# Initialize packages
npm init

# Run server
nodemon server.js

# Run DB locally
1) mongod --dbpath /Users/Shared/Previously_Relocated_Items/Security/data/db
2) Comment out the mongoose in app.js to proper one for local
3) node app.js

# Notes
- Setting up a dynamic website

# Things learned
- Using mongoose to set up schema
- Setting up partials through ejs which can be reused on multiple pages

# Update
- Had to update the logout function
https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function 
