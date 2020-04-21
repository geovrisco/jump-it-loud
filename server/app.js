require('dotenv').config()
const express = require('express')
const mongo = require('./config/mongo')

const app = express()
const port = process.env.PORT || 3001

mongo.connect(function(err){
    if(!err){
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        app.use('/leaderboard', require('./routers'))

        app.listen(port, () => {
            console.log('running on port: ',port)
        })
    }
})

module.exports = app