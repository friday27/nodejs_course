# Weather App

### TODOs
* Review 29, 30

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