const bot = require('../../lib/TelegramBot')

module.exports = (msg, _, userData) => {
    console.log(userData)

    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Hello and welcome to ArkAngel, let\'s get you started by providing your information for us to keep record.')
    bot.sendMessage(chatId, 'What is your name?')
}