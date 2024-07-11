const express = require('express');
const connectMongoDB = require('./config/dbConnect')
const recipeRoutes = require('./routes/recipe');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8000;

// static
app.use("/images",express.static('uploads'));

connectMongoDB();

app.use(cors({
    origin :[
        "http://localhost:3000"
    ],
    credentials : true
}))

//Routes
app.use('/api/recipe', recipeRoutes)
app.use('/api', authRoutes);


app.listen(PORT, () =>
    {
        console.log(`Recipe app Server is  listening on port : ${PORT}`)
    }
)

