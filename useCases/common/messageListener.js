const { question: onboardNameQuestion, handler: onboardNameHandler } = require('../onboardUser/nameListener')
const { question: onboardCitizenNumberQuestion, handler: onboardCitizenNumberHandler } = require('../onboardUser/citizenNumberListener')
const { question: onboardPhoneQuestion, handler: onboardPhoneHandler } = require('../onboardUser/phoneNumberListener')
const { question: onboardAddressQuestion, handler: onboardAddressHandler } = require('../onboardUser/addressListener')
const { question: onboardPhotoQuestion, handler: onboardPhotoHandler } = require('../onboardUser/photoListener')
const { question: onboardContactsQuestion, handler: onboardContactsHandler } = require('../onboardUser/emergencyContactsListener')
const { question: onboardPasswordQuestion, handler: onboardPasswordHandler } = require('../onboardUser/passwordListener')

const { question: trackCurrentLocationQuestion, handler: trackCurrentLocationHandler } = require('../trackUser/currentLocationListener')
const { question: trackDestinationLocationQuestion, handler: trackDestinationLocationHandler } = require('../trackUser/destinationListener')
const { question: trackEtaQuestion, handler: trackEtaHandler } = require('../trackUser/etaListener')

module.exports = (message) => {
    if (!message.reply_to_message) return

    switch (message.reply_to_message.text) {
        case onboardNameQuestion:
            onboardNameHandler(message)
            break

        case onboardCitizenNumberQuestion:
            onboardCitizenNumberHandler(message)
            break

        case onboardPhoneQuestion:
            onboardPhoneHandler(message)
            break

        case onboardAddressQuestion:
            onboardAddressHandler(message)
            break

        case onboardPhotoQuestion:
            onboardPhotoHandler(message)
            break

        case onboardContactsQuestion:
            onboardContactsHandler(message)
            break

        case onboardPasswordQuestion:
            onboardPasswordHandler(message)
            break

        case trackCurrentLocationQuestion:
            trackCurrentLocationHandler(message)
            break

        case trackDestinationLocationQuestion:
            trackDestinationLocationHandler(message)
            break

        case trackEtaQuestion:
            trackEtaHandler(message)
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

/**
 * Sequence flow of tracking messages:
 * 1. Current location
 * 2. Destination location
 * 3. Eta duration
 */