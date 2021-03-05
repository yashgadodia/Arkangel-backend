const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../localContext/LocalUserContext')
const createUserModel = require('../../model/UserInputModel')
const citizenNumberListener = require('./citizenNumberListener')

const question = "Enter your name."

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

        const userModel = createUserModel()
        userModel.name = message.text
        userModel.teleHandle = message.from.username
        userModel.teleChatId = chatId

        localUserContext.addUser(userId, userModel)
        citizenNumberListener.prompt(chatId)
    }
}