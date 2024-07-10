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
    image: {
        data: Buffer, // This will store the image data
        contentType: String // This will store the image MIME type
    },
    defaultImage: {
        type: String, // This will store a URL or file path for the default image
        default: 'food-recipe/public/default-image.jpg' // Example default image path
    },
});

module.exports = mongoose.model("recipe", recipeSchema)

