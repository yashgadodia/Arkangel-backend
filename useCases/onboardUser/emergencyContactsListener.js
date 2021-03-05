const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../localContext/LocalUserContext')
const passwordListener = require('./passwordListener')

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

    prompt: function (chatId) {
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })

        bot.sendMessage(chatId, exampleContactInfo)
    },

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
        passwordListener.prompt(chatId)
    }
}