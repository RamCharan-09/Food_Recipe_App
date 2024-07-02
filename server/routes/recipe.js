const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipe')

router.get('/', recipeController.getAllRecipes)

router.post('/', recipeController.createRecipe)

router.patch('/:id', recipeController.updateRecipe)

router.delete('/:id', recipeController.deleteRecipe)

module.exports = router ;
