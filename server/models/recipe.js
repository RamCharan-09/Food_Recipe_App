// defining the schema

const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema ({
    dishName: {
        type: String,
        required: [true, 'Dish name is required']
    },
    timeToPrepare: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user",
        default: [],
      },
      image: {
        type: String, // This will store a URL or file path for the image
        default: "default-image.jpg",
      },
});

module.exports = mongoose.model("recipe", recipeSchema)

