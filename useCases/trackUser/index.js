const bot = require('../../lib/TelegramBot')
const question = "Please share with us your live location with us to estimate your ETA to your destination."

module.exports = {
    question,
    
    handler: function (message) {
        const chatId = message.chat.id

        bot.sendMessage(chatId, question, {
            reply_markup: {
                force_reply: true
            }
        })

        // bot.sendMessage(chatId, question, {
        //     reply_markup: {
        //         inline_keyboard: [
        //             [
        //                 {
        //                     text: ''
        //                 },
        //                 {
        //                     text: ''
        //                 }
        //             ]
        //         ]
        //     }
        // })
    }
}