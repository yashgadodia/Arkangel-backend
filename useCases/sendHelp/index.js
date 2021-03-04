const bot = require('../../lib/TelegramBot')
const localUserContext = require('../../lib/LocalUserContext')
const messageListener = require('../common/messageListener')


const question = "What is the issue?"
const response = "Help is on its way."

module.exports = {
    question,


    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        // localUserContext.updateUser(userId, {
        //     type: 'ic',
        //     payload: message.text
        // })
        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
        console.log("here",messageListener)
    }
}