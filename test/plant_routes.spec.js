let assert = require('assert');
let mongoose = require('mongoose');
let { expect } = require('chai');
process.env.NODE_ENV = 'test',
    chai = require('chai'),
chaiHttp = require('chai-http'),
request = require("request"), //  Nodes request package to make request
expect = chai.expect,
server = require('../server'), // Server
should = chai.should(),
plantRoutes = require('../routes/plants');



// SCHEMA MODEL IMPORTS
var Plant = require('../models/plant');
var User = require('../models/user');

// IMPORT SEED
var plantSeedDB = require('../plantSeed.js');

let base_url = 'http://localhost:3000/';
chai.use(chaiHttp);
/******************************** SEED IMPORTS ********************************/
var plantSeed = require('../plantSeed.js');

/******************************* PLANT ROUTES **********************************/
// Delete plants from database before testing
after(done => { Plant.collection.drop(); done(); });
// var author = {
//     id: req.user._id,
//     username: req.user.username,
//     email: req.user.email
// };
var author = {
    id: "1",
    username: "brendanmusick",
};
describe('API ROUTING FOR /plants', () => {
    let plantID; // Used to access plants/:id routes
    describe('POST /plants', () => {
        it('Create a new plant', (done) => {
            chai.request(server)
                .post('/plants')
                .send({
                    genus: "Populus",
                    species: 'tremuloides',
                    imageurl: 'https://i.imgur.com/zLBBt85.jpg',
                    // author: author,
                    sepalcount: 2,
                    pedalcount: 3,
                    stamencount: 4,
                    carpelcount: 5,
                    commonname: 'Trembling Aspen',
                    description: 'This is the test',
                    familyname: 'Betulaceae'
                })
                .end((err, res) => {
                    // plantID = res.body.id;

                    // assert.equal(res.status, 200);

                    // // Genus test
                    // // assert.property(res.body.plant, 'genus');
                    // assert.equal(res.body.plant.genus, 'Populus');
                    // assert.isTrue(typeof res.body.plant.genus == 'string');

                    // // Species test
                    // assert.property(res.body.plant, 'species');
                    // assert.equal(res.body.plant.species, 'tremuloides');
                    // assert.isTrue(typeof res.body.plant.species == 'string');

                    // // Image url test
                    // assert.property(res.body.plant, 'imageurl');
                    // assert.equal(res.body.plant.imageurl, 'https://i.imgur.com/zLBBt85.jpg');
                    // assert.isTrue(typeof res.body.plant.imageurl == 'string');

                    // // Sepal count
                    // assert.property(res.body.plant, 'sepalcount');
                    // assert.equal(res.body.plant.sepalcount, 2);
                    // assert.isTrue(typeof Number.parseInt(res.body.plant.sepalcount) == 'number');

                    // // Pedal count
                    // assert.property(res.body.plant, 'pedalcount');
                    // assert.equal(res.body.plant.pedalcount, 3);
                    // assert.isTrue(typeof Number.parseInt(res.body.plant.pedalcount) == 'number');

                    // // Stamen count
                    // assert.property(res.body.plant, 'stamencount');
                    // assert.equal(res.body.plant.stamencount, 4);
                    // assert.isTrue(typeof Number.parseInt(res.body.plant.stamencount) == 'number');

                    // // Carpel count
                    // assert.property(res.body.plant, 'carpelcount');
                    // assert.equal(res.body.plant.carpelcount, 5);
                    // assert.isTrue(typeof Number.parseInt(res.body.plant.carpelcount) == 'number');

                    // // Common name test
                    // assert.property(res.body.plant, 'commonname');
                    // assert.equal(res.body.plant.commonname, 'Trembling Aspen');
                    // assert.isTrue(typeof res.body.plant.commonname == 'string');

                    // // Description test
                    // assert.property(res.body.plant, 'description');
                    // assert.equal(res.body.plant.description, 'This is the test');
                    // assert.isTrue(typeof res.body.plant.description == 'string');

                    // // Family name test
                    // assert.property(res.body.plant, 'familyname');
                    // assert.equal(res.body.plant.familyname, 'Betulaceae');
                    // assert.isTrue(typeof res.body.plant.familyname == 'string');

                    // done();
                })
        })
    })
    describe('GET /plants', function () {
        it('Load the plants home page GET plants/view', (done) => {
            chai.request(server).get('/plants/')
                .end((error, res) => {
                    assert.equal(res.status, 200);

                    // Found plants are in array
                    assert.isArray(res.body.foundPlants);
                    assert.isObject(res.body.foundPlants[0]);

                    // Genus test
                    assert.property(res.body.foundPlants[0], 'genus');
                    assert.equal(res.body.foundPlants[0].genus, 'Populus');
                    assert.isTrue(typeof res.body.foundPlants[0].genus == 'string');

                    // Species test
                    assert.property(res.body.foundPlants[0], 'species');
                    assert.equal(res.body.foundPlants[0].species, 'tremuloides');
                    assert.isTrue(typeof res.body.foundPlants[0].species == 'string');

                    // Image url test
                    assert.property(res.body.foundPlants[0], 'imageurl');
                    assert.equal(res.body.foundPlants[0].imageurl, 'https://i.imgur.com/zLBBt85.jpg');
                    assert.isTrue(typeof res.body.foundPlants[0].imageurl == 'string');

                    // Sepal count
                    assert.property(res.body.foundPlants[0], 'sepalcount');
                    assert.equal(res.body.foundPlants[0].sepalcount, 2);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlants[0].sepalcount) == 'number');

                    // Pedal count
                    assert.property(res.body.foundPlants[0], 'pedalcount');
                    assert.equal(res.body.foundPlants[0].pedalcount, 3);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlants[0].pedalcount) == 'number');

                    // Stamen count
                    assert.property(res.body.foundPlants[0], 'stamencount');
                    assert.equal(res.body.foundPlants[0].stamencount, 4);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlants[0].stamencount) == 'number');

                    // Carpel count
                    assert.property(res.body.foundPlants[0], 'carpelcount');
                    assert.equal(res.body.foundPlants[0].carpelcount, 5);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlants[0].carpelcount) == 'number');

                    // Common name test
                    assert.property(res.body.foundPlants[0], 'commonname');
                    assert.equal(res.body.foundPlants[0].commonname, 'Trembling Aspen');
                    assert.isTrue(typeof res.body.foundPlants[0].commonname == 'string');

                    // Description test
                    assert.property(res.body.foundPlants[0], 'description');
                    assert.equal(res.body.foundPlants[0].description, 'This is the test');
                    assert.isTrue(typeof res.body.foundPlants[0].description == 'string');

                    // Family name test
                    assert.property(res.body.foundPlants[0], 'familyname');
                    assert.equal(res.body.foundPlants[0].familyname, 'Betulaceae');
                    assert.isTrue(typeof res.body.foundPlants[0].familyname == 'string');
                    // console.log(res.body)
                    done();

                });
        });
        it('Load the create plant form GET plants/create', (done) => {
            chai.request(server)
                .get('/plants/create')
                .end((error, res) => {
                    // console.log(res.body)
                    assert.equal(res.status, 200);

                    // Test the inputs array used to create the inputs
                    assert.isArray(res.body.inputs);
                    assert.include(res.body.inputs, 'genus');
                    assert.include(res.body.inputs, 'species');
                    assert.include(res.body.inputs, 'common name');
                    assert.include(res.body.inputs, 'family name');
                    assert.include(res.body.inputs, 'sepal count');
                    assert.include(res.body.inputs, 'pedal count');
                    assert.include(res.body.inputs, 'stamen count');
                    assert.include(res.body.inputs, 'carpel count');
                    assert.include(res.body.inputs, 'description');
                    assert.include(res.body.inputs, 'image url');

                    // Test title
                    assert.isString(res.body.title)
                    assert.equal(res.body.title, 'create new plant')

                    // Test backLink
                    assert.isString(res.body.backLink)
                    assert.equal(res.body.backLink, '/')

                    // Test action string used to post
                    assert.isString(res.body.action)
                    assert.equal(res.body.action, '/plants')

                    // Test that this is an edit form or not
                    assert.isBoolean(res.body.edit);
                    assert.isNotTrue(res.body.edit)

                    done();
                })
        }); // end of /plants/create tests
        it('Load an individual plant, show plant page for id GET plants/:id', (done) => {
            chai.request(server)
                .get('/plants/' + plantID)
                .end((error, res) => {
                    assert.equal(res.status, 200);

                    // Genus test
                    assert.property(res.body.plant, 'genus');
                    assert.equal(res.body.plant.genus, 'Populus');
                    assert.isTrue(typeof res.body.plant.genus == 'string');

                    // Species test
                    assert.property(res.body.plant, 'species');
                    assert.equal(res.body.plant.species, 'tremuloides');
                    assert.isTrue(typeof res.body.plant.species == 'string');

                    // Image url test
                    assert.property(res.body.plant, 'imageurl');
                    assert.equal(res.body.plant.imageurl, 'https://i.imgur.com/zLBBt85.jpg');
                    assert.isTrue(typeof res.body.plant.imageurl == 'string');

                    // Sepal count
                    assert.property(res.body.plant, 'sepalcount');
                    assert.equal(res.body.plant.sepalcount, 2);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.sepalcount) == 'number');

                    // Pedal count
                    assert.property(res.body.plant, 'pedalcount');
                    assert.equal(res.body.plant.pedalcount, 3);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.pedalcount) == 'number');

                    // Stamen count
                    assert.property(res.body.plant, 'stamencount');
                    assert.equal(res.body.plant.stamencount, 4);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.stamencount) == 'number');

                    // Carpel count
                    assert.property(res.body.plant, 'carpelcount');
                    assert.equal(res.body.plant.carpelcount, 5);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.carpelcount) == 'number');

                    // Common name test
                    assert.property(res.body.plant, 'commonname');
                    assert.equal(res.body.plant.commonname, 'Trembling Aspen');
                    assert.isTrue(typeof res.body.plant.commonname == 'string');

                    // Description test
                    assert.property(res.body.plant, 'description');
                    assert.equal(res.body.plant.description, 'This is the test');
                    assert.isTrue(typeof res.body.plant.description == 'string');

                    // Family name test
                    assert.property(res.body.plant, 'familyname');
                    assert.equal(res.body.plant.familyname, 'Betulaceae');
                    assert.isTrue(typeof res.body.plant.familyname == 'string');
                    done();
                })
        }); // end of /plants/create tests
    });
    describe('PUT /plants/:id', () => {
        it('Get the edit plants page GET /plants/:id/edit', (done) => {
            chai.request(server)
                .get('/plants/' + plantID + '/edit')
                .end((err, res) => {
                    // console.log(res.body)
                    assert.equal(res.status, 200);
                    // Genus test
                    assert.property(res.body.plant, 'genus');
                    assert.equal(res.body.plant.genus, 'Populus');
                    assert.isTrue(typeof res.body.plant.genus == 'string');

                    // Species test
                    assert.property(res.body.plant, 'species');
                    assert.equal(res.body.plant.species, 'tremuloides');
                    assert.isTrue(typeof res.body.plant.species == 'string');

                    // Image url test
                    assert.property(res.body.plant, 'imageurl');
                    assert.equal(res.body.plant.imageurl, 'https://i.imgur.com/zLBBt85.jpg');
                    assert.isTrue(typeof res.body.plant.imageurl == 'string');

                    // Sepal count
                    assert.property(res.body.plant, 'sepalcount');
                    assert.equal(res.body.plant.sepalcount, 2);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.sepalcount) == 'number');

                    // Pedal count
                    assert.property(res.body.plant, 'pedalcount');
                    assert.equal(res.body.plant.pedalcount, 3);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.pedalcount) == 'number');

                    // Stamen count
                    assert.property(res.body.plant, 'stamencount');
                    assert.equal(res.body.plant.stamencount, 4);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.stamencount) == 'number');

                    // Carpel count
                    assert.property(res.body.plant, 'carpelcount');
                    assert.equal(res.body.plant.carpelcount, 5);
                    assert.isTrue(typeof Number.parseInt(res.body.plant.carpelcount) == 'number');

                    // Common name test
                    assert.property(res.body.plant, 'commonname');
                    assert.equal(res.body.plant.commonname, 'Trembling Aspen');
                    assert.isTrue(typeof res.body.plant.commonname == 'string');

                    // Description test
                    assert.property(res.body.plant, 'description');
                    assert.equal(res.body.plant.description, 'This is the test');
                    assert.isTrue(typeof res.body.plant.description == 'string');

                    // Family name test
                    assert.property(res.body.plant, 'familyname');
                    assert.equal(res.body.plant.familyname, 'Betulaceae');
                    assert.isTrue(typeof res.body.plant.familyname == 'string');

                    // Test the inputs array used to create the inputs
                    assert.isArray(res.body.inputs);
                    assert.include(res.body.inputs, 'genus');
                    assert.include(res.body.inputs, 'species');
                    assert.include(res.body.inputs, 'common name');
                    assert.include(res.body.inputs, 'family name');
                    assert.include(res.body.inputs, 'sepal count');
                    assert.include(res.body.inputs, 'pedal count');
                    assert.include(res.body.inputs, 'stamen count');
                    assert.include(res.body.inputs, 'carpel count');
                    assert.include(res.body.inputs, 'description');
                    assert.include(res.body.inputs, 'image url');

                    // Test title
                    assert.isString(res.body.title)
                    assert.equal(res.body.title, 'create new plant')

                    // Test backLink
                    assert.isString(res.body.backLink)
                    assert.equal(res.body.backLink, '/')

                    // Test action string used to post
                    assert.isString(res.body.action)
                    assert.equal(res.body.action, '/plants/' + plantID + '?_method=PUT')

                    // Test that this is an edit form or not
                    assert.isBoolean(res.body.edit);
                    assert.isTrue(res.body.edit)
                    done();
                })
        })
        it('update plant', (done) => {
            // console.log(plantID)
            chai.request(server)
                .put('/plants/' + plantID)
                .send({
                    genus: "Popular",
                    species: 'tremors',
                    imageurl: 'https://i.imgur.com/zLBBt85.jpg',
                    // author: author,
                    sepalcount: 4,
                    pedalcount: 3,
                    stamencount: 4,
                    carpelcount: 5,
                    commonname: 'Trembling Ashen',
                    description: 'This is the update',
                    familyname: 'Betulaceae'
                })
                .end((err, res) => {
                    // console.log(res.body)
                    assert.equal(res.status, 200);

                    // Found plants are in array
                    assert.isObject(res.body.foundPlant);

                    // Genus test
                    assert.property(res.body.foundPlant, 'genus');
                    assert.equal(res.body.foundPlant.genus, 'Popular');
                    assert.isTrue(typeof res.body.foundPlant.genus == 'string');

                    // Species test
                    assert.property(res.body.foundPlant, 'species');
                    assert.equal(res.body.foundPlant.species, 'tremors');
                    assert.isTrue(typeof res.body.foundPlant.species == 'string');

                    // Image url test
                    assert.property(res.body.foundPlant, 'imageurl');
                    assert.equal(res.body.foundPlant.imageurl, 'https://i.imgur.com/zLBBt85.jpg');
                    assert.isTrue(typeof res.body.foundPlant.imageurl == 'string');

                    // Sepal count
                    assert.property(res.body.foundPlant, 'sepalcount');
                    assert.equal(res.body.foundPlant.sepalcount, 4);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlant.sepalcount) == 'number');

                    // Pedal count
                    assert.property(res.body.foundPlant, 'pedalcount');
                    assert.equal(res.body.foundPlant.pedalcount, 3);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlant.pedalcount) == 'number');

                    // Stamen count
                    assert.property(res.body.foundPlant, 'stamencount');
                    assert.equal(res.body.foundPlant.stamencount, 4);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlant.stamencount) == 'number');

                    // Carpel count
                    assert.property(res.body.foundPlant, 'carpelcount');
                    assert.equal(res.body.foundPlant.carpelcount, 5);
                    assert.isTrue(typeof Number.parseInt(res.body.foundPlant.carpelcount) == 'number');

                    // Common name test
                    assert.property(res.body.foundPlant, 'commonname');
                    assert.equal(res.body.foundPlant.commonname, 'Trembling Ashen');
                    assert.isTrue(typeof res.body.foundPlant.commonname == 'string');

                    // Description test
                    assert.property(res.body.foundPlant, 'description');
                    assert.equal(res.body.foundPlant.description, 'This is the update');
                    assert.isTrue(typeof res.body.foundPlant.description == 'string');

                    // Family name test
                    assert.property(res.body.foundPlant, 'familyname');
                    assert.equal(res.body.foundPlant.familyname, 'Betulaceae');
                    assert.isTrue(typeof res.body.foundPlant.familyname == 'string');

                    done();
                });
        })
    }); // End of PUT tests
    describe('DELETE /plants/:id', () => {
        it('DELETE the individual plant /plants/:id', (done) => {
            chai.request(server)
                .delete('/plants/' + plantID)
                .send()
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, 'deleted plant')
                    done();
                });

        });
    })
})
// describe("Plants", ()=> {
//     beforeEach((done) => { //Before each test we empty the database
//         Plant.deleteMany({}, (err) => {
//             done();
//         });
//         plantSeedDB();
//     });


//     // let plantID;
//     // beforeEach(function (done) {
//     //     var newPlant = new Plant({
//     //         genus: 'Populous',
//     //         species: 'Tremuloides',
//     //         image: 'imageUrl',
//     //         author: 'Brendan',
//     //         sepals: '5',
//     //         pedals: '5',
//     //         stamens: '5',
//     //         carpels: '5',
//     //         commonName: 'Trembling Aspen',
//     //         description: 'Common tree',
//     //         family: 'Betula',
//     //         id: 23,
//     //         username: 'bendan'
//     //     });
//     //     newPlant.id;
//     //     newPlant.save(function (err) {
//     //         done();
//     //     });
//     // });
//     // afterEach(function (done) {
//     //     Plant.collection.drop();
//     //     done();
//     // });

//     // describe("GET/ plant", function () {
//     //     it("should get all the plants", function (done) {
//     //         chai.request(server)
//     //             .get('/')
//     //             .end(function (error, response) {
//     //                 //expect(response.statusCode).toBe(200);
//     //                 response.should.have.status(200);
//     //                 response.body.should.be.a('object');
//     //                 done();
//     //             });
//     //     });
//     // });

//     // Adding JSON routes so can test that the data is sent properly
//     describe("GET/ plants/json", ()=> {
//         it("returns list of all plants from database", (done)=> {
//             chai.request(server)
//                 .get('/plants/json')
//                 .end((error, response)=> {
//                     response.should.have.status(200);
//                     response.body.should.be.a('object');
//                     console.log(response);
//                     // response.text.should.include('Populous Tremuloides');
//                     // response.text.should.include('Trembling Aspen');
//                     done();

//                 });
//         });
//     });

//     describe("GET/ plants", () => {
//         it("returns list of all plants from database", (done) => {
//             chai.request(server)
//                 .get('/plants/json')
//                 .end((error, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a('object');
//                     console.log(response);
//                     // Should have dynamically loaded values to the screen
//                     response.text.should.include('Populous Tremuloides');
//                     response.text.should.include('Trembling Aspen');
//                     done();

//                 });
//         });
//     });
// });

//     // describe("GET/ plants", function () {
//     //     it("returns list of all plants from database", function (done) {
//     //         chai.request(server)
//     //             .get('/plants')
//     //             .end(function (error, response) {
//     //                 response.should.have.status(200);
//     //                 response.text.should.include('Populous Tremuloides');
//     //                 response.text.should.include('Trembling Aspen');
//     //                 done();

//     //             });
//     //     });
//     // });

//     // describe("GET /plants/:id", function () {
//     //     it("returns status code 200", function (done) {
//     //         chai.request(server)
//     //             .get('/plants')
//     //             .query('23')

//     //             .end(function (error, response) {
//     //                 //expect(response.statusCode).toBe(200);
//     //                 response.should.have.status(200);
//     //                 console.log(response.body.genus);

//     //                 done();
//     //             });
//     //     });
//     // });

//     // describe("GET /books/create", function () {
//     //     it("returns status code 200", function (done) {
//     //         chai.request(server)
//     //             .get('/books/create')
//     //             .end(function (error, response) {
//     //                 //expect(response.statusCode).toBe(200);
//     //                 response.should.have.status(200);
//     //                 done();
//     //             });
//     //     });
//     // });


//     describe('POST /plants, submit a new plant to the plant collection', ()=>{
//         it("returns status code 200", function (done) {
//             var auth = new User({
//                 id: "1",
//                 username: "bendan"
//             });
//             var newPlant = {
//                 genus: 'Populous',
//                 species: 'Tremuloides',
//                 image: 'imageUrl',
//                 author: 'Brendan',
//                 sepals: '5',
//                 pedals: '5',
//                 stamens: '5',
//                 carpels: '5',
//                 commonName: 'Trembling Aspen',
//                 description: 'Common tree',
//                 family: 'Betula',
//                 id: 23,
//                 username: 'bendan'
//             }
//             chai.request(server)
//                 .post('/plants')
//                 // .type('form')
//                 .send(newPlant)
//                 .end(function (err, res) {
//                     expect(err).to.be.null;
//                     // expect(res).to.have.status(200);
//                     res.body.should.be.a("object");
//                     expect(res.body).to.be.a("object");
//                     console.log(res.body);
//                     done();
//                 })

//         });
//     })

//     // // describe('PUT /books/update update the book', () => {
//     // //     it("returns status code 200", function (done) {
//     // //         chai.request(server)
//     // //             .post('/:title&:author')
//     // //             .query({ title: 'The Art of Invisibility', author: 'Kevin D. Mitnick' })
//     // //             .type('form')
//     // //             .send({
//     // //                 '_method': 'put',
//     // //                 'title': 'We Were Anonymous',
//     // //                 'author': 'Perry Olson',
//     // //                 'image': 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1336065338l/13528420.jpg'

//     // //                 // 'username': 'brendanmusick'
//     // //             })
//     // //             .end(function (err, res) {
//     // //                 expect(err).to.be.null;
//     // //                 expect(res).to.have.status(200);
//     // //                 done();
//     // //             })
//     // //     })

//     // // })

//     // describe('GET /authorize?username=brendanmusick&password=brendanmusick&email=test%40test.com for login route',()=>{

//     // });

//     // /********************************** SYNOPSIS ROUTES ******************************/
//     // describe('GET /synopsis/:title&:author/create form page for creating synopsis on specific book', () => {
//     //     it('returns status code 200',(done)=>{
//     //         chai.request(server)
//     //             .get('/synopsis/:title&:author/create')
//     //             .query({ title: 'The Art of Invisibility', author: 'Kevin D. Mitnick' })
//     //             .end((error, response)=> {
//     //                 response.should.have.status(200);
//     //                 done();
//     //             });
//     //     })
//     // });
