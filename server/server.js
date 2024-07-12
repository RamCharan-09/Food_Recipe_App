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
        "https://recipe-client-bice.vercel.app"
    ],
    credentials : true
}))

//Routes
app.use('/api/recipe', recipeRoutes)
app.use('/api', authRoutes);
app.get("/", async (req, res) => {
    return res.status(200).json({ message: "Recipe app server is up and running!"})
});

app.listen(PORT, () =>
    {
        console.log(`Recipe app Server is  listening on port : ${PORT}`)
    }
)


