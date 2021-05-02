//require necessary modules and json data.
const express = require('express');
const data = require('./data');
const path = require('path');

//initialize the express app
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index', { projects: data.projects})
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', (req, res, next) => {
    res.render('project', { project: data.projects[req.params.id]});
});

//app.use(errorHandlers);



app.listen(3000);