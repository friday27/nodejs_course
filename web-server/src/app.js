const path = require('path');
const express = require('express');
const hbs = require('hbs');

// console.log(__dirname); //path of the current script
// console.log(__filename); //path to this file

// Create an Express application
const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
// http://expressjs.com/en/4x/api.html#app.set
app.set('view engine', 'hbs'); //handlebar extension
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    //render one of the views
    // param1: name of the view
    // param2: data obj which can be fetched by .hbs
    res.render('index', { 
        title: 'Weather App',
        name: 'Lily Potter'
    }); 
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lily Potter'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Harry Potter',
        helpMsg: 'I am here to help :)'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        location: 'Xindian',
        forecast: 'snowy'
    });
});

// Start the server
// Access the app in browser by http://localhost:3000/
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});