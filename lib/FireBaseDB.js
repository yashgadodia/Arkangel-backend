// setup firebase 
var admin = require("firebase-admin");
var serviceAccount = require("../arkangel-firebase-firebase-adminsdk-2r4vg-e5cf136274.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://arkangel-firebase-default-rtdb.firebaseio.com"
});

let database = admin.database();

module.exports = {
    writeUser(userObject) {
        const { identityNumber, ...reaminingUserInfo } = userObject
        database.ref(`users/${identityNumber}`).set(reaminingUserInfo)
    },

    async isUserExist(teleHandle) {
        const snapshot = await database.ref('users').get()
        const users = snapshot.toJSON()

        for (const citizenNumber of Object.keys(users)) {
            const { teleHandle: userTeleHandle } = users[citizenNumber]
            if (teleHandle === userTeleHandle) {
                return true
            }
        }

        return false
    },

    async updateUserLastKnownLocation(teleHandle, location) {
        const snapshot = await database.ref('users').get()
        const users = snapshot.toJSON()

        for (const citizenNumber of Object.keys(users)) {
            const { teleHandle: userTeleHandle } = users[citizenNumber]
            if (teleHandle === userTeleHandle) {
                database.ref(`users/${citizenNumber}/lastKnownLocation`).set(location)
                return
            }
        }
    }
}


