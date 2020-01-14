const https = require('https');
const url = 'https://api.darksky.net/forecast/d55c62b60febef26e42acb10312f31ec/40,-75?units=si&lang=zh-tw&exclude=hourly,minutely';

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (error) => {
    console.log('An error', error);
});

request.end();