const router = require('express').Router()
const { Game } = require('../models')
const passport = require('../config/auth')

const authenticate = passport.authorize('jwt', { session: false })

const getNewGrid = require('./games/newGrid')

module.exports = io => {
  router.get('/games', (req, res, next) => {
    Game.find()
      // Newest games first
      .sort({ createdAt: -1 })
      // Send the data in JSON format
      .then((games) => {
        io.emit('action', {
          type: 'FETCHED_GAMES',
          payload: games
        })
        return res.json(games)
      })
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
    })
    .get('/games/:id', (req, res, next) => {
      const id = req.params.id
      Game.findById(id)
        .then((game) => {
          // console.log('got id');
          if (!game) { return next() }
          res.json(game)
        })
        .catch((error) => next(error))
    })
    .post('/games', authenticate, (req, res, next) => {
      let newGame = req.body
      newGame.userId = req.account._id
      newGame.grid=getNewGrid()

      Game.create(newGame)
        .then((game) => {
          io.emit('action', {
            type: 'GAME_CREATED',
            payload: game
          })
          res.json(game)
        })
        .catch((error) => next(error))
    })
    .patch('/games/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      Game.findById(id)
        .then((game) => {
          if (!game) { return next() }
          if (req.body.clicked) {
            const newGrid = game.grid.map(tile=>{
              if (tile._id == req.body._id){
                return req.body
              }
              return tile
            })
            const availableTiles = newGrid.filter((tile) => {if (tile.clicked == 'false') return tile}).length
            if (availableTiles<1) {
              const wP = game.players
  						.sort(function(a,b) {
  							if (a.score>b.score){
  								return -1
  							}
  							if (b.score>a.score){
  								return 1
  							}
  							return 0
  						})[0].userName
              let wonGame={winner: wP}
              io.emit('action', {
                type: 'WINNER_DETERMINED',
                payload: wonGame
              })
               res.json(game)
            }
            const newScores = game.players.map(player => {
              if (player.userId +'' === req.body.userId) {
                let newScore=0
                switch(req.body.content) {
                  case -1 :
                  if (req.body.clicked!=='right'){
                     player.score = player.score - 10
                     return player
                   }
                    else {
                      player.score = player.score + 1
                      return player
                    }
                  default :
                  if (req.body.clicked!=='right') {
                    player.score = player.score + 1
                    return player
                  }
                  else {
                    player.score = player.score - 1
                    return player
                  }
                }
              }
              return player
            })
            Game.findByIdAndUpdate(id, {grid: newGrid, players: newScores}, {new: true})
            .then((game) => {
              io.emit('action', {
                type: 'GAME_UPDATED',
                payload: game
              })
             res.json(game)
           })
         }
         else if (req.body.user_action){
           if (req.body.user_action ==='user_joined'){
             const players = game.players.map(player=>player.userId.toString())
             // console.log(req.body.userId)
             if (!players.includes(req.body.userId)){
              let newPlayers = game.players.concat({
                 userId: req.body.userId,
                 score: 0,
                 userName: req.body.userName
               })
               Game.findByIdAndUpdate(id, {players: newPlayers}, {new: true})
               .then((game) => {
                 io.emit('action', {
                   type: 'GAME_UPDATED',
                   payload: game
                 })
                res.json(game)
              })
            }
           }
           if (req.body.user_action ==='user_left'){
             console.log('user_left')
             let leftPlayers = game.players.filter(player=>player.userId.toString()!==req.body.userId)
             Game.findByIdAndUpdate(id, {players: leftPlayers}, {new: true})
             .then((game) => {
               io.emit('action', {
                 type: 'GAME_UPDATED',
                 payload: game
               })
              res.json(game)
            })
           }
         }
       })
          .catch((error) => next(error))
    })
    .delete('/games/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      if (Game.authorId === req.account._id)
      Game.findByIdAndRemove(id)
          .then((id) => {
            io.emit('action', {
              type: 'GAME_REMOVED',
              payload: id
            })
            res.json(id)
          })
          .catch((error) => next(error))
    })
    return router
}
// module.exports = router
