const express = require('express');
const mongoose = require('mongoose');
const recipe = require('./recipe');

const app = express();
app.use(express.json());

const PORT = 8000;
const connectionString = "mongodb://0.0.0.0:27017/recipe";
mongoose.connect(connectionString)
.then(() => console.log("Successfully connected to MongoDB"))
.catch((err) => console.error(`Error connecting to MongoDB: ${err}`))

//Routes
app.get('/api/recipe', async(req, res) => {
    try{
        const allRecipes = await recipe.find()
        return res.status(200).send(allRecipes)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({message: 'Failed to fetch all recipes'})
    }   
})

app.post('/api/recipe', async (req, res) => {
    try {
        const newRecipe = await recipe.create(req.body);
        return res.status(201).send({ newRecipe })
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to create new recipe' })
    }
})

app.patch('/api/recipe/:id', async (req, res) => {
    try{
        const updatedRecipe = await recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).send(updatedRecipe)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to update recipe' })
    }
})

app.delete('/api/recipe/:id', async (req, res) => {
    try{
        const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
        return res.status(200).send(deletedRecipe)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to delete recipe' })
    }
})

app.listen(PORT, () =>
    {
        console.log(`Recipe app Server is  listening on port : ${PORT}`)
    }
)
