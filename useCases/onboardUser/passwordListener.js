const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../localContext/LocalUserContext')
const db = require('../../lib/FireBaseDB')

const question = "Enter a password to verify you have reached your destination in the future."
const onboardEndText = "Thank you for registering with ArkAngel, we will notify you when you are verified."

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

        localUserContext.updateUser(userId, {
            type: 'password',
            payload: message.text
        })

        bot.deleteMessage(chatId, message.message_id)
        bot.sendMessage(chatId, onboardEndText)

        const userObject = localUserContext.getUser(userId)
        try {
            db.writeUser(userObject)
        } catch (e) {
            console.error(e)
        }

        localUserContext.removeUser(userId)
    }
}