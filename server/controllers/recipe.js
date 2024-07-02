//import the model because await function recipe is using the declared recipe imported from model

const recipe = require('../models/recipe')

exports.getAllRecipes = async(req, res) => {
    try{
        const allRecipes = await recipe.find()
        return res.status(200).send(allRecipes)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({message: 'Failed to fetch all recipes'})
    }   
}

exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = await recipe.create(req.body);
        return res.status(201).send({ newRecipe })
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to create new recipe' })
    }
}

exports.updateRecipe = async (req, res) => {
    try{
        const updatedRecipe = await recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(updatedRecipe)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to update recipe' })
    }
}

exports.deleteRecipe = async (req, res) => {
    try{
        const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
        return res.status(200).send(deletedRecipe)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to delete recipe' })
    }
}

