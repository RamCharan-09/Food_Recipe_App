const express = require('express')
const recipeRouter = express.Router()
const recipeController = require('../controllers/recipe')
const { authenticate } = require('../middlewares/authMiddleware')

recipeRouter.get('/', recipeController.getAllRecipes)

recipeRouter.get('/:id', recipeController.getRecipesById)

recipeRouter.post('/', authenticate, recipeController.createRecipe)

recipeRouter.patch('/:id', authenticate, recipeController.updateRecipe)

recipeRouter.delete('/:id', authenticate, recipeController.deleteRecipe)

module.exports = recipeRouter ;
