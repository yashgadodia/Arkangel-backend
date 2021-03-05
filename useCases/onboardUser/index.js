const bot = require('../../lib/TelegramBot')
const nameListener = require('./nameListener')

module.exports = function (message) {
    const chatId = message.chat.id

    bot.sendMessage(chatId, 'Hello and welcome to ArkAngel, let\'s get you started by providing your information for us to keep record.')
    nameListener.prompt(chatId)
}