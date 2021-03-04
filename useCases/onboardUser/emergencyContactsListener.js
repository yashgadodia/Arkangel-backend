const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')

const question = "Enter a password to verify you have reached your destination in the future."

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        const contacts = message.text.split('\n')
        const contactsArr = []

        for (const contact of contacts) {
            const [name, phoneNo, relationship] = contact.split(',')
            contactsArr.push({ name, phoneNo, relationship })
        }

        localUserContext.updateUser(userId, {
            type: 'emergencyContacts',
            payload: contactsArr
        })

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
    }
}