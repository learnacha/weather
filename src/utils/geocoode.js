const request = require('postman-request');

const geoCode = (address, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZm9yZXZlcml0aGQiLCJhIjoiY2tzNHRmN291MjltdTJ3bzk2cDdrbWtlMCJ9.x460T6Y9KyfhA6kCtTTLHA&limit=1`

    request({
        url: geoURL,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect location services', undefined);
        } else if (!body.features.length) {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            const { features: [city] } = body;
            const { center: [lat, long], place_name } = city;

            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: place_name
            })
        }
    })
}

module.exports = geoCode