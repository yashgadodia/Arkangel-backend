const bot = require('../../lib/TelegramBot')
const question = ""

module.exports = {
    question,


    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id
    }
}