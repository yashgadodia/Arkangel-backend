const bot = require('../../lib/TelegramBot')
const messageListener = require('../common/messageListener')


const question = "What is the issue?"
const response = "Help is on its way."

module.exports = {
    question,


    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })
        console.log("here",messageListener)
    }
}