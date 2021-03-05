const currentLocationListener = require('./currentLocationListener')

module.exports = message => {
    const chatId = message.chat.id
    currentLocationListener.prompt(chatId)
}