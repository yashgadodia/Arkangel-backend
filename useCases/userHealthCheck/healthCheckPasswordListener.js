const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

const question = "Enter your password to identify your identity."

const passwordAttempts = {}

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
        
        bot.deleteMessage(chatId, message.message_id)

        // TODO: Verify the password

        if (passwordAttempts[userId]) {
            passwordAttempts[userId]++
        } else {
            passwordAttempts[userId] = 1
        }

        if (passwordAttempts[userId] === 3) {
            // TODO: Add firebase historical alert
            delete passwordAttempts[userId]
            return
        }

        bot.sendMessage(chatId, "We have stopped our tracking activity, please continue to stay safe by using ArkAngel!")
    }
}