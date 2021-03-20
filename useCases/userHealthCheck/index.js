const bot = require('../../lib/TelegramBot')
const firebaseDb = require('../../lib/FireBaseDB')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

module.exports = performHealthCheck

const HEALTH_CHECK_INTERVAL = 300000 // Fixed to 5 minutes
const HEALTH_CHECK_DEADLINE = 60000 // Fixed to 1 minute

// For testing
// const HEALTH_CHECK_INTERVAL = 5000
// const HEALTH_CHECK_DEADLINE = 2000

function performHealthCheck(userId, immediate = false) {
    const healthCheck = () => {
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
    }

    if (immediate) {
        healthCheck()
    } else {
        setTimeout(function () {
            healthCheck()
        }, HEALTH_CHECK_INTERVAL)
    }
}

function setHealthCheckResponseDeadline(userId) {
    setTimeout(async function () {
        const tracker = localTrackingContext.getTracker(userId)
        if (!tracker || !tracker.shouldPerformHealthCheck) return

        const { respondedToHealthCheck, missedHealthChecks } = tracker
        if (!respondedToHealthCheck && missedHealthChecks > 2) {
            localTrackingContext.updateTracker(userId, {
                type: 'missedHealthChecks',
                payload: 0
            })
            alertPolice(tracker)
        } else if (!respondedToHealthCheck) {
            localTrackingContext.updateTracker(userId, {
                type: 'missedHealthChecks',
                payload: missedHealthChecks + 1
            })

            await firebaseDb.addHistoryAlerts(userId, tracker.currentLocation,
                `Did not respond to ArkAngel's message for ${missedHealthChecks + 1} time(s).`)

            performHealthCheck(userId, true)
        }
    }, HEALTH_CHECK_DEADLINE)
}

async function alertPolice(tracker) {
    // TODO: JsonRPC to frontend to alert police
    console.log('Alerting the police')
}