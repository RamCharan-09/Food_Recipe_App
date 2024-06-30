const express = require('express')

const app = express()

app.use(express.json())

const PORT = 8000;

app.listen(PORT, () =>
    {
        console.log(`Server is  listening on port : ${PORT}`)
    }
)