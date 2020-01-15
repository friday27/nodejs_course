# Weather App

### TODOs
* Review 29, 30
* Watch skipped videos: 38

### Making HTTP Requests

        const request = require('request');
        const url = '...';
        //2 parameters:
        // (1) URL parameters
        // (2) The function to deal with error ans response
        request({url: url, json: true}, (error, reponse) => (
            console.log(reponse.body);
        ));

### Error Handling

        request({url: url}, (error, response) => {
            if (error) {
                //error handling for low-level errors
            } else if (response.body...) {
                //handling different types of errors
            } else {
                //...normal operations
            }
        });

### Callback Function
* Use callback function to make the things to do in a function as simple as possible.

        const geocode = (address, callback) => {
            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnJpZGF5MjciLCJhIjoiY2s1NnQwMnBpMGMybDNlbXIzb3czaWxjNCJ9.Uiuv2LXh0RxPScU2oaRK7Q&limit=1';
            request({url: url, json: true}, (error, response) => {
                if (error) {
                    //let the callback function to deal with errors
                    //data parameter will be set to undefined in this case
                    callback('Unable to connect to location services :(');
                } else if (response.body.features.length === 0) {
                    callback('Cannot find any information of this location! Try another search');
                } else {
                    callback(undefined, {
                        lat: response.body.features[0].center[1],
                        long: response.body.features[0].center[0],
                        locaion: response.body.features[0].place_name,
                    });
                }
            });
        };

        geocode('London', (error, data) => {
            console.log('Error', error);
            console.log('Data', data);
        });

### Express
* Install

        npm install express --save

* app.js

        const express = require('express');

        // Create an Express application
        const app = express();

        // We can send back string, html and JSON
        app.get('', (req, res) => {
            res.send('<h1>Express</h1>');
        });

        // Express will automatically convert object to JSON
        app.get('/help', (req, res) => {
            res.send([{
                name: 'Andrew',
                age: 18
            }, {
                name: 'Tom'
            }]);
        });

        // Start the server
        // Access the app in browser by http://localhost:3000/
        app.listen(3000, () => {
            console.log('Server is up on port 3000.');
        });

* Static style

        //import html files under public/
        const path = require('path');
        const publicDir = path.join(__dirname, '../public');
        app.use(express.static(publicDir));

* Dynamic style - hbs and render

        //npm i hbs
        app.set('view engine', 'hbs');

        //create an index.hbs file under views/
        app.get('', (req, res) => {
            //render one of the views
            // param1: name of the view
            // param2: data obj which can be fetched by .hbs
            res.render('index', { 
                title: 'Weather App',
                name: 'Lily Potter'
            }); 
        });


