const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')
const gmaps = require('../../lib/GMaps')
const healthCheck = require('../userHealthCheck')

const question = "How should we process your estimated time to reach your destination time? (e.g. 15 mins)"
const manualEtaQuestion = "What is your estimated time to reach your destination?"
const healthCheckText = "We will be checking in on your every five minutes for your safety, please respond timely."

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

    autoHandler: async function (message) {
        const userId = message.from.id

        const currentLocation = localTrackingContext.getTracker(userId).currentLocation
        const destinationLocation = localTrackingContext.getTracker(userId).destinationLocation

        const estimatedDuration = await gmaps.getDistanceByGeolocation(currentLocation, destinationLocation)
        localTrackingContext.updateTracker(userId, {
            type: 'etaToDestination',
            payload: estimatedDuration
        })

        startHealthCheck(message.message.chat.id, userId)
    },

    manualHandler: function (message) {
        const userId = message.from.id

        localTrackingContext.updateTracker(userId, {
            type: 'etaToDestination',
            payload: message.text
        })

        startHealthCheck(message.chat.id, userId)
    }
}

function startHealthCheck(chatId, userId) {
    bot.sendMessage(chatId, healthCheckText)
    localTrackingContext.updateTracker(userId, {
        type: 'shouldPerformHealthCheck',
        payload: true
    })

    healthCheck(userId)
}