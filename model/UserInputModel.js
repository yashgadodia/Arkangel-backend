module.exports = () => {
    return {
        identityNumber: null,
        name: null,
        photo: null,
        address: null,
        phoneNo: null,
        teleHandle: null,
        teleChatId: null,
        emergencyContacts: [],
        validationStatus: 0,
        reason: null,
        lastKnownLocation: {
            lat: null,
            lng: null
        },
        password: '',
        safeZone: [],
        historicalAlerts: [],
        sendHelp: ''
    }
}