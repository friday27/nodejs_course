const path = require('path');
const express = require('express');

// console.log(__dirname); //path of the current script
// console.log(__filename); //path to this file

// Create an Express application
const app = express();
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

// replace by public/index.html
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
//     // Express will automatically convert object to JSON
//     res.send([{
//         name: 'Andrew',
//         age: 18
//     }, {
//         name: 'Tom'
//     }]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// });

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