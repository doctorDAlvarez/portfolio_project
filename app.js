//require necessary modules and json data.
const express = require('express');
const { projects } = require('./data');

//initialize the express app
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId);
    if ( project ) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});

//app.use(errorHandlers);



app.listen(3000, () => {
    console.log('Server listening on port 3000')
});