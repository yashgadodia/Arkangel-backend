const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../lib/LocalTrackingContext')

const question = "How should we process your estimated time to reach your destination time?"

module.exports = {
    question,

    prompt: function (chatId) {
        bot.sendMessage(chatId, question, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Estimate automatically',
                            callback_data: 'auto'
                        },
                        {
                            text: 'Input manually',
                            callback_data: 'manual'
                        }
                    ]
                ]
            }
        })
    },

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        const currentLocation = localTrackingContext.getTracker(userId).currentLocation
        const destinationLocation = localTrackingContext.getTracker(userId).destinationLocation
        // TODO: Retrieve ETA by using two geolocation

        localTrackingContext.updateTracker(userId, {
            type: 'etaToDestination',
            payload: message.text
        })
    }
}