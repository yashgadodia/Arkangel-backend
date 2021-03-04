const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')
const createUserModel = require('../../model/UserInputModel')

const question = "Enter your citizenship number."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        const userModel = createUserModel()
        userModel.name = message.text
        userModel.teleHandle = message.from.username
        userModel.teleChatId = chatId

        localUserContext.addUser(userId, userModel)
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}