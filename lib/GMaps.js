const fetch = require('node-fetch')

module.exports = {
    async getGeolocationByName(destinationName) {
        const endpoint = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destinationName}&inputtype=textquery&fields=geometry&key=${process.env.GOOGLE_API_KEY}`
        const response = await fetch(endpoint)
        const responseJson = await response.json()

        if (responseJson.status === "OK" && responseJson.candidates.length > 0) {
            // Assumes that first candidate is the user's option
            return responseJson.candidates[0].geometry.location
        }
    },

    async getDistanceByGeolocation({ lat: originLat, lng: originLng }, { lat: destLat, lng: destLng }) {
        const endopint = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&departure_time=now&key=${process.env.GOOGLE_API_KEY}`
        const response = await fetch(endopint)
        const responseJson = await response.json()

        if (responseJson.status === "OK" && responseJson.rows.length > 0) {
            // Assumes that first fow and element is the distance needed
            return responseJson.rows[0].elements[0].duration.text
        }
    }
}