const {getDatabase} = require('../config/mongo')
const LeaderBoard = getDatabase().collection('leaderboard');

class LeaderBoardModel {
    static findAll(){
        return LeaderBoard.find().toArray()
    }
    static addLeaderBoard(data){
        return LeaderBoard.insertOne(data)
    }
}

module.exports = LeaderBoardModel

