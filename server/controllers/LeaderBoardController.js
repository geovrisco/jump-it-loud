const LeaderBoard = require('../models/leaderboard')

class LeaderBoardController {
    static findAll(req, res, next){
        LeaderBoard.findAll()
        .then(result => {
            res.status(200).json({leaderBoard: result})
            console.log(result)
        })
        .catch(err => {
            console.log(err, '<< dari get all leaderboard')
            res.status(500).json({msg: 'Server Error'})
        })
    }
    static addLeaderBoard(req, res, next){
        let data = req.body
        LeaderBoard.addLeaderBoard(data)
        .then(result => {
            res.status(201).json({
                msg: 'Successfully add leaderboard',
                data: result.ops[0]
            })
        })
        .catch(err => {
            console.log(err, '<< dari add leaderboard')
            res.status(500).json({msg: 'Server Error'})
        })
    }
}

module.exports = LeaderBoardController