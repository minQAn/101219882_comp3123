const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
require('dotenv').config();
const corsMiddleware = require('./cors');

const app = express();
// app.use(bodyParser.json());
app.use(express.json()); // same as body parser

// Cors
app.options('*', corsMiddleware);
app.use(corsMiddleware); 


const apiRouter = require('./api');
app.use('/api', apiRouter);

const {DB_URL} = process.env;
mongoose
    .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Successfully connected.');
    })
    .catch(e => {
        console.error(`DB connect Failed: ${e}`);
    });

app.get('/', (req, res) => {
    res.send("test");
});

app.post('/', (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "no content"
        })
    }

    console.log(req.body);
    const {name, email} = req.body;
    const person = {
        name,
        email
    }

    try{
        res.send(person);
    }catch(err){
        res.status(500).send(err);
    }
})

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})