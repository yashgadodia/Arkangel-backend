const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

module.exports = performHealthCheck

const HEALTH_CHECK_INTERVAL = 300000 // Fixed to 5 minutes
const HEALTH_CHECK_DEADLINE = 60000 // Fixed to 1 minute

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

        localTrackingContext.updateTracker(userId, {
            type: 'respondedToHealthCheck',
            payload: false
        })
        setHealthCheckResponseDeadline(userId)
    }, HEALTH_CHECK_INTERVAL)
}

function setHealthCheckResponseDeadline(userId) {
    setTimeout(async function () {
        const tracker = localTrackingContext.getTracker(userId)
        if (!tracker || !tracker.shouldPerformHealthCheck) return

        const { respondedToHealthCheck } = tracker
        if (!respondedToHealthCheck) {
            alertPolice(userId)
        }

        await firebaseDb.addHistoryAlerts(userId, tracker.currentLocation, "Did not response to ArkAngel's message in time.")
    }, HEALTH_CHECK_DEADLINE)
}

function alertPolice(userId) {
    // TODO: Alert the police
}