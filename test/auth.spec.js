/******************************** TESTING *******************************
 * 'mocha' in terminal to run
 * In routes, use if statements to see if NODE_ENV='test' which causes routes
 * to return JSON for testing
*/

let mocha = require('mocha'),
    request = require('request'),
    server = require('../server.js');
    chai = require('chai'),
    assert = chai.assert,
    chaiHttp = require('chai-http'),
    should = chai.should(),
    chai.use(chaiHttp);

let Plant = require('../models/plant'),
    User = require('../models/user');

// Delete user from database before testing
after(done => { User.collection.drop(); done(); });

describe('API ROUTING FOR USER REGISTRATION /', () => {
    describe('GET /register form page', () => {
        it('Load the register form', (done) => {
            chai.request(server).get('/register').end((error, res) => {
                assert.equal(res.status, 200);

                // Test the inputs array used to create the inputs
                assert.isArray(res.body.inputs);

                assert.include(res.body.inputs, 'username');
                assert.include(res.body.inputs, 'password');
                assert.include(res.body.inputs, 'email');

                // Test title
                assert.isString(res.body.title)
                assert.equal(res.body.title, 'become rooted in nature')

                // Test backLink
                assert.isString(res.body.backLink)
                assert.equal(res.body.backLink, '/')

                // Test action string used to post
                assert.isString(res.body.action)
                assert.equal(res.body.action, '/register')

                // Test that this is an edit form or not
                assert.isBoolean(res.body.edit);
                assert.isNotTrue(res.body.edit)

                done();
            })
        })

    })
    describe('POST /register form page', function () {
        it('POST a new user to the site', (done) => {
            chai.request(server).post('/register')
                .send({
                    username: "brendanmusick",
                    password: "brendanspassword",
                    email: "bmuze1@gmail.com"
                })
                .end((error, res) => {
                    assert.equal(res.status, 200);
                    // console.log(res.body)
                    // Username test
                    assert.property(res.body, 'username');
                    assert.equal(res.body.username, 'brendanmusick');
                    assert.isTrue(typeof res.body.username == 'string');

                    // Password test
                    // assert.property(res.body, 'password');
                    // assert.property(res.body, 'salt');
                    // assert.property(res.body, 'hash');

                    // Image url test
                    assert.property(res.body, 'email');
                    assert.equal(res.body.email, 'bmuze1@gmail.com');
                    assert.isTrue(typeof res.body.email == 'string');

                    done();
                })
        })

    })
})

describe('API ROUTING FOR USER LOGIN /', () => {
    describe('GET /login form page', function () {
        it('', (done) => {
            chai.request(server).get('/login').end((error, response) => {

                assert.equal(200, response.statusCode);
                done();
            })
        })

    })
    describe('POST /login form page', function () {
        it('', (done) => {
            chai.request(server).post('/login')
                .send({
                    username: "brendanmusick",
                    password: "brendanspassword"
                }).end((error, response) => {
                assert.equal(200, response.statusCode);
                assert.equal(res.body.username, 'brendanmusick');

                done();
            })
        })

    })
})

// describe('API ROUTING FOR USER LOGOUT /', () => {
//     describe('GET /logout form page', function () {
//         it('', (done) => {
//             chai.request(server).get('/logout').end((error, response) => {

//                 assert.equal(200, response.statusCode);
//                 done();
//             })
//         })

//     })
// })