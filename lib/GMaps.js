const fetch = require('node-fetch')

module.exports = {
    async getGeolocationByName(destinationName) {
        const endpoint = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destinationName}&inputtype=textquery&fields=geometry&key=${process.env.GOOGLE_API_KEY}`
        const response = await fetch(endpoint)
        return await response.json()
    },

    getDistanceByGeolocation({ originLat, originLng }, { destLat, destLng }) {
        const endopint = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&departure_time=now&key=${process.env.GOOGLE_API_KEY}`
        const response = await fetch(endopint)
        return await response.json()
    }
}