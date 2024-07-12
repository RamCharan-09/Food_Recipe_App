//import the model because await function recipe is using the declared recipe imported from model

const recipe = require('../models/recipe')
const user = require("../models/user");

exports.getAllRecipes = async(req, res) => {
    try{
        // console.log(req.user)
        const allRecipes = await recipe.find().populate("author");
        return res.status(200).send(allRecipes);
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({message: 'Failed to fetch all recipes'})
    }   
}

exports.getRecipesById = async(req, res) => {
    try{
        // console.log(req.user)
        const Recipes = await recipe.findOne({_id:req.params.id})
        return res.status(200).send(Recipes)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({message: 'Failed to fetch the recipes'})
    }   
}

exports.createRecipe = async (req, res) => {
    try {
      console.log(req.body);
      const author = await user.findById(req.user.id);
      const image = `${process.env.SERVER_URL}/images/${req.file.filename}`;
      const payload = {
        ...req.body,
        author,
        image,
      };
      console.log(payload);
      const newRecipe = await recipe.create(payload);
      return res.status(201).send({ newRecipe });
    } catch (error) {
      console.log("Error:", error.message);
      return res.status(400).send({ message: "Failed to create new recipe" });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
      console.log(req.body);
      const author = await user.findById(req.user.id);
      const payload = {
        ...req.body,
        author,
      };
      if (req.file) {
        const image = `${process.env.SERVER_URL}/images/${req.file.filename}`;
        payload.image = image;
      }
  
      const updatedRecipe = await recipe.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
      );
      return res.status(200).send(updatedRecipe);
    } catch (error) {
      console.log("Error:", error.message);
      return res.status(400).send({ message: "Failed to update recipe" });
    }
};



exports.deleteRecipe = async (req, res) => {
    try{
        const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
        return res.status(200).send(deletedRecipe)
    } catch (error) {
        console.log('Error:', error.message)
        return res.status(400).send({ message: 'Failed to delete recipe' })
    }
}

exports.like = async (req, res) => {
    try {
      const usr = await user.findById(req.user.id).lean();
  
      const recp = await recipe.findById(req.params.id);
  
  
      if (recp.likes.includes(usr._id)) {
        recp.likes = recp.likes.filter((id) => {
          return id.equals(usr._id) === false;
        });
      } else {
        recp.likes.push(usr._id);
      }
  
      console.log(recp.likes);
  
      await recp.save();
      return res.status(200).send(recp);
    } catch (error) {
      console.log("Error:", error.message);
      return res.status(400).send({ message: "Failed to like recipe" });
    }
};
