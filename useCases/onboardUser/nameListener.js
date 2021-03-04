const bot = require('../../lib/TelegramBot')
const question = "Enter your identity number."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}