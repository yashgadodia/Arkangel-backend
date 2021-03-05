const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')
const etaListener = require('./etaListener')

const question = "Please enter your destination location name."

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
        const chatId = message.chat.id
        const userId = message.from.id

        // TODO: Retrieve geolocation by using destination name

        // TODO: Update localTrackingContext

        localTrackingContext.updateTracker(userId, {
            type: 'destinationName',
            payload: message.text
        })
        etaListener.prompt(chatId)
    }
}