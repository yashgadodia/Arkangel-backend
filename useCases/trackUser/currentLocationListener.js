const bot = require('../../lib/TelegramBot')
const createTrackingModel = require('../../model/TrackUserInputModel')
const localTrackingContext = require('../../lib/LocalTrackingContext')
const destinationLocationListener = require('./destinationListener')

const question = "Please share your live location with us to estimate your ETA to your destination."

module.exports = {
    question,

    prompt: function (chatId) {
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    },

    handler: function (message) {
        if (!message.location) return

        const chatId = message.chat.id
        const userId = message.from.id

        const trackingModel = createTrackingModel()
        trackingModel.chatId = chatId
        trackingModel.currentLocation = {
            lat: message.location.latitude,
            lng: message.location.longitude
        }

        localTrackingContext.addTracker(userId, trackingModel)
        destinationLocationListener.prompt(chatId)
    }
}