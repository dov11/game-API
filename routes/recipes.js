const router = require('express').Router()
const { Recipe } = require('../models')
const passport = require('../config/auth')


router.get('/recipes', (req, res, next) => {
  Recipe.find()
    // Newest recipes first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((recipes) => {
      return res.json(recipes)
    })
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .post('/recipes', passport.authorize('jwt', { session: false }), (req, res, next) => {
    let newRecipe = req.body
    newRecipe.authorId = req.account._id
    console.log(newRecipe)

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .put('/recipes/:id', (req, res, next) => {
    let newRecipe = req.body
    // newRecipe.authorId = req.account._id
    const id = req.params.id
    // Recipe.findById(id)
      // .then((recipe) => {
        // if (!recipe) { return next() }
    //     // return recipe
      // }).then(() => {
        Recipe.findByIdAndUpdate(id, newRecipe)
        .then(() => res.json({message: "updated"}))
        .catch((error) => next(error))
      // })
      // .catch((error) => next(error))
  })
  .patch('/recipes/:id', (req, res, next) => {
    let updateRecipe = req.body
    // const id = req.params.id
        Recipe.update(updateRecipe)
        // Recipe.findByIdAndUpdate(id, newRecipe)
        .then(() => res.json({message: "patched"}))
        .catch((error) => next(error))
      // })
      // .catch((error) => next(error))
  })
  .delete('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findByIdAndRemove(id)
        .then(() => res.json({ message: 'Successfully deleted' }))
        .catch((error) => next(error))
  })

module.exports = router
