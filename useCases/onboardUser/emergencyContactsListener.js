const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')

const question = "Enter a password to verify you have reached your destination in the future."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        // TODO: split the string and add into objects data
        // person_name,phone_number,relationship
        console.log(message.text.split('\n'))

        localUserContext.updateUser(userId, {
            type: 'emergencyContacts'
        })

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}