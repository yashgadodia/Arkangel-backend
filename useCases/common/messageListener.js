const { question: onboardDefaultQuestion } = require('../onboardUser')
const { question: onboardNameQuestion, handler: onboardNameListener } = require('../onboardUser/nameListener')
const { question: onboardCitizenNumberQuestion, handler: onboardCitizenNumberListener } = require('../onboardUser/citizenNumberListener')
const { question: onboardPHoneQuestion, handler: onboardPhoneListener } = require('../onboardUser/phoneNumberListener')
const { question: onboardAddressQuestion, handler: onboardAddressListener } = require('../onboardUser/addressListener')

module.exports = (message) => {
    if (!message.reply_to_message) return

    switch (message.reply_to_message.text) {
        case onboardDefaultQuestion:
            onboardNameListener(message)
            break

        case onboardNameQuestion:
            onboardCitizenNumberListener(message)
            break

        case onboardCitizenNumberQuestion:
            onboardPhoneListener(message)
            break

        case onboardPHoneQuestion:
            onboardAddressListener(message)
            break
    }
}

/**
 * Sequence flow of onboarding messages:
 * 1. Name
 * 2. Citizen number
 * 3. Phone number
 * 4. Address
 * 5. Photo
 */