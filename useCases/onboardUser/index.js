const bot = require('../../lib/TelegramBot')
const question = "Enter your name."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id

        bot.sendMessage(chatId, 'Hello and welcome to ArkAngel, let\'s get you started by providing your information for us to keep record.')
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}