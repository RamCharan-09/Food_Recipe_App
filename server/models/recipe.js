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
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("recipe", recipeSchema)

