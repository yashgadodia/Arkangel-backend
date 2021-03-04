const { question: onboardUserDefaultQuestion } = require('../onboardUser')
const { handler: onboardNameListener } = require('../onboardUser/nameListener')

module.exports = (message) => {
    if (!message.reply_to_message) return

    switch (message.reply_to_message.text) {
        case onboardUserDefaultQuestion:
            onboardNameListener(message)
            break
    }
}