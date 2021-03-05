const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

const question = "How should we process your estimated time to reach your destination time?"

const manualEtaQuestion = "What is your estimated time to reach your destination?"

module.exports = {
    question: manualEtaQuestion,

    prompt: function (chatId) {
        bot.sendMessage(chatId, question, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Estimate automatically',
                            callback_data: 'etaListener_auto'
                        },
                        {
                            text: 'Input manually',
                            callback_data: 'etaListener_manual'
                        }
                    ]
                ]
            }
        })
    },

    promptManualEta: function (chatId) {
        bot.sendMessage(chatId, manualEtaQuestion, {
            reply_markup: {
                force_reply: true
            }
        })
    },

    autoHandler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        const currentLocation = localTrackingContext.getTracker(userId).currentLocation
        const destinationLocation = localTrackingContext.getTracker(userId).destinationLocation
        // TODO: Retrieve ETA by using two geolocation

        localTrackingContext.updateTracker(userId, {
            type: 'etaToDestination',
            payload: message.text
        })
    },

    manualHandler: function (message) {
        console.log(message)
    }
}