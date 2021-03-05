const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../localContext/LocalUserContext')
const photoListener = require('./photoListener')

const question = "Enter your address."

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
            type: 'address',
            payload: message.text
        })
        photoListener.prompt(chatId)
    }
}