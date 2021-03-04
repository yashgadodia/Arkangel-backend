const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')

const question = "Enter your phone number."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        localUserContext.updateUser(userId, {
            type: 'phone',
            payload: message.text
        })

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })

        console.log(localUserContext.getUser(userId))
    }
}