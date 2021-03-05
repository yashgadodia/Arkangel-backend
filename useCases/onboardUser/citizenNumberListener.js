const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')
const phoneNumberListener = require('./phoneNumberListener')

const question = "Enter your citizenship number."

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

        localUserContext.updateUser(userId, {
            type: 'identityNumber',
            payload: message.text
        })
        phoneNumberListener.prompt(chatId)
    }
}