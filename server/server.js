const express = require('express');
const connectMongoDB = require('./config/dbConnect')
const recipeRoutes = require('./routes/recipe');
require('dotenv').config();
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

connectMongoDB()

//Routes
app.use('/api/recipe', recipeRoutes)
app.use('/api', authRoutes);


app.listen(PORT, () =>
    {
        console.log(`Recipe app Server is  listening on port : ${PORT}`)
    }
)

