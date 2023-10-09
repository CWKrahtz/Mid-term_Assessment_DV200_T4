const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const oilRoute = require('./routes/oils.jsx')
const userRoute = require('./routes/users.jsx')

const multer = require('multer')
const path = require('path')
const { error } = require('console')
const UserModel = require('./models/Users')

require('dotenv/config')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(oilRoute)
app.use(userRoute)

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Oiloasis',
}).then(() => console.log("Connected to Oiloasis DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => { console.log(`Server has Started on port:${PORT}`)});