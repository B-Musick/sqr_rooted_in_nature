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

describe("Plants", ()=> {
    beforeEach((done) => { //Before each test we empty the database
        Plant.deleteMany({}, (err) => {
            done();
        });
        plantSeedDB();
    });


    // let plantID;
    // beforeEach(function (done) {
    //     var newPlant = new Plant({
    //         genus: 'Populous',
    //         species: 'Tremuloides',
    //         image: 'imageUrl',
    //         author: 'Brendan',
    //         sepals: '5',
    //         pedals: '5',
    //         stamens: '5',
    //         carpels: '5',
    //         commonName: 'Trembling Aspen',
    //         description: 'Common tree',
    //         family: 'Betula',
    //         id: 23,
    //         username: 'bendan'
    //     });
    //     newPlant.id;
    //     newPlant.save(function (err) {
    //         done();
    //     });
    // });
    // afterEach(function (done) {
    //     Plant.collection.drop();
    //     done();
    // });

    // describe("GET/ plant", function () {
    //     it("should get all the plants", function (done) {
    //         chai.request(server)
    //             .get('/')
    //             .end(function (error, response) {
    //                 //expect(response.statusCode).toBe(200);
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 done();
    //             });
    //     });
    // });

    // Adding JSON routes so can test that the data is sent properly
    describe("GET/ plants/json", ()=> {
        it("returns list of all plants from database", (done)=> {
            chai.request(server)
                .get('/plants/json')
                .end((error, response)=> {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    console.log(response);
                    // response.text.should.include('Populous Tremuloides');
                    // response.text.should.include('Trembling Aspen');
                    done();

                });
        });
    });

    describe("GET/ plants", () => {
        it("returns list of all plants from database", (done) => {
            chai.request(server)
                .get('/plants/json')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    console.log(response);
                    // Should have dynamically loaded values to the screen
                    response.text.should.include('Populous Tremuloides');
                    response.text.should.include('Trembling Aspen');
                    done();

                });
        });
    });
});

    // describe("GET/ plants", function () {
    //     it("returns list of all plants from database", function (done) {
    //         chai.request(server)
    //             .get('/plants')
    //             .end(function (error, response) {
    //                 response.should.have.status(200);
    //                 response.text.should.include('Populous Tremuloides');
    //                 response.text.should.include('Trembling Aspen');
    //                 done();

    //             });
    //     });
    // });

    // describe("GET /plants/:id", function () {
    //     it("returns status code 200", function (done) {
    //         chai.request(server)
    //             .get('/plants')
    //             .query('23')

    //             .end(function (error, response) {
    //                 //expect(response.statusCode).toBe(200);
    //                 response.should.have.status(200);
    //                 console.log(response.body.genus);

    //                 done();
    //             });
    //     });
    // });

    // describe("GET /books/create", function () {
    //     it("returns status code 200", function (done) {
    //         chai.request(server)
    //             .get('/books/create')
    //             .end(function (error, response) {
    //                 //expect(response.statusCode).toBe(200);
    //                 response.should.have.status(200);
    //                 done();
    //             });
    //     });
    // });


    describe('POST /plants, submit a new plant to the plant collection', ()=>{
        it("returns status code 200", function (done) {
            var auth = new User({
                id: "1",
                username: "bendan"
            });
            var newPlant = {
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
                id: 23,
                username: 'bendan'
            }
            chai.request(server)
                .post('/plants')
                // .type('form')
                .send(newPlant)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    // expect(res).to.have.status(200);
                    res.body.should.be.a("object");
                    expect(res.body).to.be.a("object");
                    console.log(res.body);
                    done();
                })

        });
    })

    // // describe('PUT /books/update update the book', () => {
    // //     it("returns status code 200", function (done) {
    // //         chai.request(server)
    // //             .post('/:title&:author')
    // //             .query({ title: 'The Art of Invisibility', author: 'Kevin D. Mitnick' })
    // //             .type('form')
    // //             .send({
    // //                 '_method': 'put',
    // //                 'title': 'We Were Anonymous',
    // //                 'author': 'Perry Olson',
    // //                 'image': 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1336065338l/13528420.jpg'

    // //                 // 'username': 'brendanmusick'
    // //             })
    // //             .end(function (err, res) {
    // //                 expect(err).to.be.null;
    // //                 expect(res).to.have.status(200);
    // //                 done();
    // //             })
    // //     })

    // // })

    // describe('GET /authorize?username=brendanmusick&password=brendanmusick&email=test%40test.com for login route',()=>{

    // });

    // /********************************** SYNOPSIS ROUTES ******************************/
    // describe('GET /synopsis/:title&:author/create form page for creating synopsis on specific book', () => {
    //     it('returns status code 200',(done)=>{
    //         chai.request(server)
    //             .get('/synopsis/:title&:author/create')
    //             .query({ title: 'The Art of Invisibility', author: 'Kevin D. Mitnick' })
    //             .end((error, response)=> {
    //                 response.should.have.status(200);
    //                 done();
    //             });
    //     })
    // });
