const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../lib/LocalTrackingContext')

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        console.log(message)

        const currentLocation = localTrackingContext.getTracker(userId).currentLocation
        const destinationLocation = localTrackingContext.getTracker(userId).destinationLocation
        // TODO: Retrieve ETA by using two geolocation

        localTrackingContext.updateTracker(userId, {
            type: 'etaToDestination',
            payload: message.text
        })
    }
}