const bot = require('../../lib/TelegramBot')
const firebaseDb = require('../../lib/FireBaseDB')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

const PASSWORD_COUNTDOWN = 4 * 60 * 1000 // 4 minutes

// For testing
// const PASSWORD_COUNTDOWN = 10000

const question = "Enter your password to identify your identity."
const passwordAttempts = {}
const passwordTimeoutHandlers = {}

module.exports = {
    question,

    prompt: async function (chatId, userId) {
        promptForPassword(chatId, userId)
    },

    handler: async function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        clearTimeout(passwordTimeoutHandlers[userId])
        delete passwordTimeoutHandlers[userId]

        await bot.deleteMessage(chatId, message.message_id)
        const isPasswordValid = await firebaseDb.isPasswordValid(chatId, message.text)

        if (!isPasswordValid) {
            passwordAttempts[userId] ? passwordAttempts[userId]++ : passwordAttempts[userId] = 1

            if (passwordAttempts[userId] === 3) {
                delete passwordAttempts[userId]
                const tracker = localTrackingContext.getTracker(userId)

                await firebaseDb.addHistoryAlerts(userId, tracker.currentLocation,
                    "Password entered incorrectly for 3 times.")
                await bot.sendMessage(chatId,
                    "We have alerted the police as your have entered your password incorrectly for 3 attempts.")

                alertPolice(tracker)
                return
            }

            promptForPassword(chatId, userId)
            return
        }

        localTrackingContext.removeUser(userId)
        bot.sendMessage(chatId, "We have stopped our tracking activity, please continue to stay safe by using ArkAngel!")
    }
}

async function promptForPassword(chatId, userId) {
    await bot.sendMessage(chatId, question, {
        reply_markup: {
            force_reply: true
        }
    })

    localTrackingContext.updateTracker(userId, {
        type: 'shouldPerformHealthCheck',
        payload: false
    })

    passwordTimeoutHandlers[userId] = setTimeout(async () => {
        const tracker = localTrackingContext.getTracker(userId)
        await firebaseDb.addHistoryAlerts(userId, tracker.currentLocation,
            "Password not entered within 4 minutes.")
        bot.sendMessage(chatId, "We have not heard from you for the last 4 minutes, we're alerting the police for your safety.")
        alertPolice(tracker)
    }, PASSWORD_COUNTDOWN)
}

function alertPolice() {
    // TODO: JsonRPC to frontend to alert police
    console.log('Alerting the police')
}