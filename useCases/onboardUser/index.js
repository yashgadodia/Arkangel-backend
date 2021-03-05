const firebaseDb = require('../../lib/FireBaseDB')
const bot = require('../../lib/TelegramBot')
const nameListener = require('./nameListener')

module.exports = async function (message) {
    const chatId = message.chat.id

    bot.sendChatAction(chatId, 'typing')
    const isUserCreated = await firebaseDb.isUserExist(message.chat.username)
    if (isUserCreated) {
        bot.sendMessage(chatId, 'Thank you for registering with ArkAngel.')
    } else {
        bot.sendMessage(chatId, 'Hello and welcome to ArkAngel, let\'s get you started by providing your information for us to keep record.')
        nameListener.prompt(chatId)
    }
}