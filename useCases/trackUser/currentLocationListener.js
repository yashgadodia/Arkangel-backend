const bot = require('../../lib/TelegramBot')
const createTrackingModel = require('../../model/TrackUserInputModel')
const localTrackingContext = require('../../lib/LocalTrackingContext')
const question = "Please enter your destination name."

module.exports = {
    question,
    
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

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}