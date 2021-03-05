const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')
const emergencyContactListener = require('./emergencyContactsListener')

const question = "Upload your identificaiton card for verification."

module.exports = {
    question,

    prompt: function (chatId) {
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    },

    handler: async function (message) {
        if (!message.photo || message.photo.length === 0) return

        const chatId = message.chat.id
        const userId = message.from.id
        const fileId = message.photo[message.photo.length - 1].file_id
        
        const photoLink = await bot.getFileLink(fileId)

        localUserContext.updateUser(userId, {
            type: 'photo',
            payload: photoLink
        })
        emergencyContactListener.prompt(chatId)
    }
}