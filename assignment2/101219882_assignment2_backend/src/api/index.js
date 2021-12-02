const express = require('express');
const app = express();
const employeeRouter = require('./employee/employee');

// /api 
app.get('/', (req, res) => {
    res.send('API Page');
})

app.get('/v1', (req, res) => {
    res.send('V1 Page');
})

// /api/v1/ -> 
app.use('/v1', employeeRouter);

module.exports = app;
