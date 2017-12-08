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
			// console.log('requesting:', req.params.id);
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
      newGame.players=[{
        userId: req.account._id
      }]
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
    .put('/games/:id', (req, res, next) => {
      let game = req.body
      // newGame.authorId = req.account._id
      const id = req.params.id
          Game.findByIdAndUpdate(id, game)
          .then((game) => {
            io.emit('action', {
              type: 'GAME_UPDATED',
              payload: game
            })
            res.json(game)
          })
          .catch((error) => next(error))
        // })
        // .catch((error) => next(error))
    })
    .patch('/games/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      Game.findById(id)
        .then((game) => {
          if (!game) { return next() }
          const newDate = req.body
          game.update(newData)
          // Game.findByIdAndUpdate(id, newGame)
          .then((updateGame) => {
            io.emit('action', {
              type: 'GAME_UPDATED',
              payload: updateGame
            })
           res.json(updateGame)
         })
       })
          .catch((error) => next(error))
        // })
        // .catch((error) => next(error))
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
