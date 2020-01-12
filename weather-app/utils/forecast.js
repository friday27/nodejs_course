const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/d55c62b60febef26e42acb10312f31ec/' + lat + ',' + long + '?units=si&lang=zh-tw&exclude=hourly,minutely';
    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service :(');
        } else if (response.body.error) {
            callback('Unable to find location.');
        } else {
            // callback(undefined, {
            //     temperature: response.body.currently.temperature,
            //     precipProbability: response.body.currently.precipProbability,
            // });
            callback(undefined, 'It\'s ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.');
        }
    });
};

module.exports = forecast;