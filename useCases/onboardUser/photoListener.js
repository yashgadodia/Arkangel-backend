const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')

const question = "Enter your emergency contacts details so that we can alert them when something happen to you."
const exampleContactInfo = `
Please enter the details in the following format:
person_name,phone_number,relationship

Example:
Yash,46553152,father
Nicholas,123123,brother
`

module.exports = {
    question,

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

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
        bot.sendMessage(chatId, exampleContactInfo)
    }
}