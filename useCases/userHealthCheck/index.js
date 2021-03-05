const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

module.exports = performHealthCheck

const HEALTH_CHECK_INTERVAL = 300000 // Fixed to 5 minutes

function performHealthCheck(userId) {
    setTimeout(function () {
        const tracker = localTrackingContext.getTracker(userId)
        if (!tracker || !tracker.shouldPerformHealthCheck) return

        const { chatId } = tracker
        bot.sendMessage(chatId, "Have you reached your destination?", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Yes',
                            callback_data: 'healthCheck_yes'
                        },
                        {
                            text: 'No',
                            callback_data: 'healthCheck_no'
                        }
                    ]
                ]
            }
        })
    }, HEALTH_CHECK_INTERVAL)
}