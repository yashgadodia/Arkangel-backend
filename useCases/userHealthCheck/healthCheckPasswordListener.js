const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

const question = "Enter your password to identify your identity."

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

        let isPasswordCorrect = false
        let incorrectAttempts = 0

        do {
            // TODO: Verify the password

            incorrectAttempts++
            if (incorrectAttempts === 3) {
                // TODO: Add historical alerts
            }

            bot.deleteMessage(chatId, message.message_id)
        } while (!isPasswordCorrect && incorrectAttempts < 3)

        if (!isPasswordCorrect) return

        bot.sendMessage(chatId, "We have stopped our tracking activity, please continue to stay safe by using ArkAngel!")
    }
}