const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')
const gmaps = require('../../lib/GMaps')
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

    handler: async function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        const { lat, lng } = await gmaps.getGeolocationByName(message.text)
        localTrackingContext.updateTracker(userId, {
            type: 'destinationLocation',
            payload: { lat, lng }
        })

        localTrackingContext.updateTracker(userId, {
            type: 'destinationName',
            payload: message.text
        })
        etaListener.prompt(chatId)
    }
}