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
        it('Should return 200 and array of leaderboard', (done) => {
            request(app)
            .get('/leaderboard')
            .then(response => {
                let {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('leaderBoard')
                done()
            }).catch(err =>{
                done(err)
            })
        })
    })
})

describe('add leaderboard', function(){
    describe('successfully add leaderboard', function(){
        it('Should return 201 and an object(msg, data)', (done) => {
            request(app)
            .post('/leaderboard')
            .send({
                name: 'Geo',
                score: 205
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('msg', 'Successfully add leaderboard')
                expect(body).toHaveProperty('data')
                expect(body.data.name).toBe('Geo')
                expect(body.data.score).toBe(205)
                done()
            }).catch(err => {
                done(err)
            })
        })
    })
})