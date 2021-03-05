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

        if (!users) return

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

        if (!users) return

        for (const citizenNumber of Object.keys(users)) {
            const { teleHandle: userTeleHandle } = users[citizenNumber]
            if (teleHandle === userTeleHandle) {
                database.ref(`users/${citizenNumber}/lastKnownLocation`).set(location)
                return
            }
        }
    },

    async addHistoryAlerts(userId, location, reason) {
        const snapshot = await database.ref('users').get()
        const users = snapshot.toJSON()

        if (!users) return

        for (const citizenNumber of Object.keys(users)) {
            const { teleChatId } = users[citizenNumber]
            if (teleChatId === userId) {
                const historySnapshot = await database.ref(`users/${citizenNumber}/historicalAlerts`).get()
                const historyAlerts = historySnapshot.toJSON()

                if (!historyAlerts) {
                    await database.ref(`users/${citizenNumber}/historicalAlerts`).set({
                        0: {
                            location,
                            reason,
                            timestamp: Date.now()
                        }
                    })
                } else {
                    const historyLength = Object.keys(historyAlerts).length - 1
                    await database.ref(`users/${citizenNumber}/historicalAlerts`).set({
                        [historyLength]: {
                            location,
                            reason,
                            timestamp: Date.now()
                        }
                    })
                }
            }
        }
    }
}