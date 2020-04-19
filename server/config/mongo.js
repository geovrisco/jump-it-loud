const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

async function connect (callback){
    await client.connect(function(err){
        if(err){
            console.log('connection mongo failed', err)
            callback(err)
        } else {
            console.log('successfully connect to mongo')
            db = client.db('jump-it-loud')
            callback(null)
        }
    })
}  

function getDatabase(){
    return db
}

module.exports = {connect, getDatabase}