const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')
const currentLocationListener = require('./currentLocationListener')

module.exports = message => {
    const chatId = message.chat.id
    const userId = message.from.id

    const tracker = localTrackingContext.getTracker(userId)
    if (tracker && tracker.shouldPerformHealthCheck) {
        bot.sendMessage(chatId, "We have already started tracking you")
    } else {
        currentLocationListener.prompt(chatId)
    }
}