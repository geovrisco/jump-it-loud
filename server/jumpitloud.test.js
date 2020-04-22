const request = require('supertest')
const app = require('./app')
const {MongoClient} = require('mongodb')

var connection;
var db;

beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    db = await connection.db('jump-it-loud');
});

describe('get all leaderboard', function(){
    describe('successfully get leaderboard', function() {
        it('Should return 200', (done) => {
            request(app)
            .get('/leaderboard')
            .then(response => {
                let {status} = response
                expect(status).toBe(200)
                done()
            }).catch(err =>{
                done(err)
            })
        })
    })
    describe('successfully get leaderboard', function() {
        it('Should have property leaderboard', (done) => {
            request(app)
            .get('/leaderboard')
            .then(response => {
                let {body} = response
                expect(body).toHaveProperty('leaderBoard')
                done()
            }).catch(err =>{
                done(err)
            })
        })
    })
})

describe('add leaderboard', function(){
    describe('successfully add leaderboard ', function(){
        it('Should return 201', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {status} = response
                expect(status).toBe(201)
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Msg property should have Successfully add leaderboard', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body.msg).toBe('Successfully add leaderboard')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property msg', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body).toHaveProperty('msg')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property data', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body).toHaveProperty('data')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property data, and data should have property name', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body.data).toHaveProperty('name')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property data, and data should have property score', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body.data).toHaveProperty('score')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property data, and data.name should be geo', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body.data.name).toBe('Geo')
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
    describe('successfully add leaderboard ', function(){
        it('Should have property data, and data.score should be 205', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body} = response
                expect(body.data.score).toBe(205)
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
})