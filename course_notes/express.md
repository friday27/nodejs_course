# [Express](http://expressjs.com)

## Installation

`npm install express`

## Basics (app.js)

    const express = require('express');

    const app = express();

    app.set('port', process.env.PORT || 3000);

    /*
    * Use app.get() to set up a handler for an HTTP GET request
    *
    * 1st arg: the path to set up the handler for
    * 2nd arg: the function to run when that path is visited
    */

    app.get('', (req, res) => {
      // res.send() -> send back a message as the response
      res.send('Hello Express!');
    });

    app.get('/weather', (req, res) => {
      // Provide an object to send as JSON
      res.send({
        location: 'Xindian',
        forecast: 'Wonderful!'
      });
    });

    app.get('/about', (req, res) => {
      // Provide HTML to render in the browser
      res.send('<h1>About Us</h1>');
    });

    // Start the server
    app.listen(port, () => {
      console.log('Server is up on port '+port+'.');
    });

## Serving up Static Assets

    // Add the following line in app.js to let the browser be able to access public/
    const path = require('path')

    // ...

    // __dirname -> the directory path for the current script
    const publicDir = path.join(__dirname, '../public');

    app.use(express.static(publicDirectoryPath));
