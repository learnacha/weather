const request = require('postman-request');



const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b18fd38d514400da7811351d46435d1b&query=${long},${lat}&units=f`;

    request({
        url,
        json: true
    }, (error, res, body) => {
        if (error) {
            callback('error while calling weather api', undefined)
            return;
        }

        if (body.error) {
            callback('the cooridnates not found from weather api', undefined);
            return;
        }

        const { current: {temperature, feelslike, weather_descriptions}} = body;
        callback(undefined, {
            temperature,
            feelslike,
            weather_descriptions
        })
    })
}

module.exports = forecast;