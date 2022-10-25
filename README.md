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

# Add Plant Key
1) Turn pdftotext
2) Order each sentence onto separate lines (result must be separated at end by '. . . .', sentence must start with #[letter])
3) Use rin_group_extractor (/usr/local/bin) script , will need to have it here so $PATH calls it and can access it from anywhere in the terminal
    - Will need to type type the name of the file when asked (so need to call in the folder where file located so it can access)
4) Place into public/scripts/plant_keys
5) Place import statement into the plant route
6) Place into the keys object which is used to access the keys
7) Add new object to the /keys route with parameters {name,group} which are passed to the keys index page where people can choose which key they want
8) Will be called in the /plant/keys/:param route and accessed depending on which parameter given (:param) --> keys[:param]

# Adding Value to the Model
- Have to add the value and type to the model
- Change the show.ejs file
- Change the new.ejs file
- Change edit.ejs file
- Add property to the create route and insert into the object created

# How to add Tooltip
https://stackoverflow.com/questions/7117073/add-a-tooltip-to-a-div

# Testing
- Using MochaJS

https://mochajs.org/

- Chai
npm install --save-dev chai chai-http

- request
https://www.npmjs.com/package/request 

## Tutorials
https://www.youtube.com/watch?v=gooRv5o6ePM&list=PLJetLDY7yKurTuyZZhZCC136VAs8BEdOo&index=5&ab_channel=S%C3%B8renSpangsbergJ%C3%B8rgensen 

## Run tests
```npm test```