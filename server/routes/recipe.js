const express = require('express')
const recipeRouter = express.Router()
const recipeController = require('../controllers/recipe')
const { authenticate } = require('../middlewares/authMiddleware')

recipeRouter.get('/', authenticate, recipeController.getAllRecipes)

recipeRouter.post('/', authenticate, recipeController.createRecipe)

recipeRouter.patch('/:id', authenticate, recipeController.updateRecipe)

recipeRouter.delete('/:id', authenticate, recipeController.deleteRecipe)

module.exports = recipeRouter ;
