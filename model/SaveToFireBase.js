const { Method } = require("protobufjs");

// TODO: Yash, upload to firebase store

admin.database().ref('users/' + userObject.identityNumber).set({
    name: userObject.name,
    photo: userObject.photo,
    address: userObject.address,
    teleHandle: userObject.teleHandle,
    emergencyContact: userObject.emergencyContacts,
    validationStatus: userObject.validationStatus,
    reason: userObject.reason,
    lastKnownLocation: userObject.lastKnownLocation,
    password: userObject.password,
    safezone: userObject.safezone,
    historicalAlerts: userObject.historicalAlerts,
    sendHelp = userObject.sendHelp
});