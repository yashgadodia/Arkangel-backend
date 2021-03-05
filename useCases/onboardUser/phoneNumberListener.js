const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../localContext/LocalUserContext')
const addressListener = require('./addressListener')

const question = "Enter your phone number."

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
            type: 'phoneNo',
            payload: message.text
        })
        addressListener.prompt(chatId)
    }
}