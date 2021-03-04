const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../lib/LocalTrackingContext')
const question = "How should we process your estimated time to reach your destination time?"

module.exports = {
    question,

    handler: function (message) {
        const chatId = message.chat.id
        const userId = message.from.id

        localTrackingContext.updateTracker(userId, {
            type: 'destinationName',
            payload: message.text
        })

        bot.sendMessage(chatId, question, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Estimate automatically'
                        },
                        {
                            text: 'Input manually'
                        }
                    ]
                ]
            }
        })
    }
}