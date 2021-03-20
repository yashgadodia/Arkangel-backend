const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalTrackingContext')

const etaListener = require('../trackUser/etaListener')
const healthCheckPasswordListener = require('../userHealthCheck/healthCheckPasswordListener')
const healthCheck = require('../userHealthCheck')

module.exports = (message) => {
    const tracker = localTrackingContext.getTracker(message.from.id)
    if (!tracker) return

    bot.editMessageReplyMarkup({ inline_keyboard: [[]] }, { chat_id: tracker.chatId, message_id: message.message.message_id })
    bot.answerCallbackQuery(message.id)

    const chatId = message.message.chat.id
    const userId = message.from.id

    switch (message.data) {
        case 'etaListener_auto':
            etaListener.autoHandler(message)
            break

        case 'etaListener_manual':
            etaListener.promptManualEta(chatId)
            break

        case 'healthCheck_yes':
            healthCheckPasswordListener.prompt(chatId)
            break

        case 'healthCheck_no':
            localTrackingContext.updateTracker(userId, {
                type: 'respondedToHealthCheck',
                payload: true
            })

            healthCheck(userId)
            break
    }
}