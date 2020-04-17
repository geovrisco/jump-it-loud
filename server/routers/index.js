const router = require('express').Router()
const LeaderBoardController = require('../controllers/LeaderBoardController')

router.get('/', LeaderBoardController.findAll)
router.post('/', LeaderBoardController.addLeaderBoard)

module.exports = router