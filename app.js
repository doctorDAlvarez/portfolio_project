//require necessary modules and json data.
const express = require('express');
const { projects } = require('./data');

//initialize the express app
const app = express();

//setting pug
app.set('view engine', 'pug');

//serving static files.
app.use('/static', express.static('public'));


//basic routing
app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res, next) => {
    res.render('about');
});

app.get('/project/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);
    if ( project ) {
        res.render('project', { project });
    } else {
        next();
    }
});

//errorHandlers;
app.use((req, res, next) => {
    const err = new Error('The resource you are looking does not exists');
    err.status = 404;
    console.error(err.stack);
    res.render('page-not-found', { err });
});
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    res.status(500);
    res.render('error', { err });
});

//starting the server and loggin in the console.
app.listen(3000, () => {
    console.log('Server listening on port 3000')
});