const request = require('request');

// const url = 'https://api.darksky.net/forecast/d55c62b60febef26e42acb10312f31ec/24.974104,121.544291?units=si&lang=zh-tw&exclude=hourly,minutely';
// request({ url: url, json: true }, (error, response) => {
//     console.log(response.body.daily.data[0].summary);
//     const temperature = response.body.currently.temperature;
//     const rainProb = response.body.currently.precipProbability;
//     console.log('It\'s '+temperature+' degrees out. There is a '+rainProb+'% chance of rain.');
// });

//address -> latitude and logitude
const token = 'pk.eyJ1IjoiZnJpZGF5MjciLCJhIjoiY2s1NnQwMnBpMGMybDNlbXIzb3czaWxjNCJ9.Uiuv2LXh0RxPScU2oaRK7Q';
const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=' + token;

request({url: mapURL, json: true}, (error, response) => {
    const center = response.body.features[0].center
    const lat = response.body.features[0].center[1];
    const long = response.body.features[0].center[0];
    console.log('latitude: '+lat);
    console.log('longitude: '+long);
});