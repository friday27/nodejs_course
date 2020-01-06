const request = require('request');

const url = 'https://api.darksky.net/forecast/d55c62b60febef26e42acb10312f31ec/37.8267,-122.4233';

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data.currently);
});