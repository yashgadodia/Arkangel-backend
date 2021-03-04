const { question: onboardDefaultQuestion } = require('../onboardUser')
const { question: onboardNameQuestion, handler: onboardNameListener } = require('../onboardUser/nameListener')
const { question: onboardCitizenNumberQuestion, handler: onboardCitizenNumberListener } = require('../onboardUser/citizenNumberListener')
const { question: onboardPHoneQuestion, handler: onboardPhoneListener } = require('../onboardUser/phoneNumberListener')
const { question: onboardAddressQuestion, handler: onboardAddressListener } = require('../onboardUser/addressListener')
const { question: onboardUserPhotoQuestion, handler: onboardPhotoListener } = require('../onboardUser/photoListener')
const { question: onboardContactQuestion, handler: onboardContactListener } = require('../onboardUser/emergencyContactsListener')
const { handler: onboardPasswordListener } = require('../onboardUser/passwordListener')
const { question: trackDefaultQuestion } = require('../trackUser')
const { question: trackUserDestQuestion, handler: trackUserDestHandler } = require('../trackUser/currentLocationListener')

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

        case onboardAddressQuestion:
            onboardPhotoListener(message)
            break

        case onboardUserPhotoQuestion:
            onboardContactListener(message)
            break

        case onboardContactQuestion:
            onboardPasswordListener(message)
            break

        case trackDefaultQuestion:
            trackUserDestHandler(message)
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
 * 6. Emergency contacts
 * 7. Password
 */