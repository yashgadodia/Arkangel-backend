const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')

module.exports = {
    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        localUserContext.updateUser(userId, {
            type: 'password',
            payload: message.text
        })

        bot.deleteMessage(chatId, message.message_id)
        bot.sendMessage(
            chatId,
            "Thank you for registering with ArkAngel, we will notify you when you are verified."
        )
    }
}