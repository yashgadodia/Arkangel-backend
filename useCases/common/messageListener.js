const { question: onboardUserDefaultQuestion } = require('../onboardUser')
const { question: onboardUserNameQuestion, handler: onboardNameListener } = require('../onboardUser/nameListener')
const { question: onboardUserCitizenNumberQuestion, handler: onboardCitizenNumberListener } = require('../onboardUser/citizenNumberListener')
const { question: onboardUserPhoneQuestion, handler: onboardPhoneListener } = require('../onboardUser/phoneNumberListener')
const { question: onboardUserAddressQuestion, handler: onboardAddressListener } = require('../onboardUser/addressListener')

module.exports = (message) => {
    if (!message.reply_to_message) return

    switch (message.reply_to_message.text) {
        case onboardUserDefaultQuestion:
            onboardNameListener(message)
            break

        case onboardUserNameQuestion:
            onboardCitizenNumberListener(message)
            break

        case onboardUserCitizenNumberQuestion:
            onboardPhoneListener(message)
            break

        case onboardUserPhoneQuestion:
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