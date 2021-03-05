const bot = require('../../lib/TelegramBot')
const localTrackingContext = require('../../localContext/LocalUserContext')

const etaListener = require('../trackUser/etaListener')

module.exports = (message) => {
    const tracker = localTrackingContext.getTracker(message.from.id)
    if (!tracker) return

    bot.editMessageReplyMarkup({ inline_keyboard: [[]] }, { chat_id: tracker.chatId, message_id: message.message.message_id })
    bot.answerCallbackQuery(message.id)

    switch (message.data) {
        case 'etaListener_auto':
            etaListener.autoHandler(message)
            break

        case 'etaListener_manual':
            etaListener.promptManualEta(message.message.chat.id)
            break
    }
}