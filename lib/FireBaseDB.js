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

    async getUserByTeleChatId(teleChatId) {
        const snapshot = await database.ref('users').get()
        const users = snapshot.toJSON()

        for (const citizenNumber of Object.keys(users)) {
            const user = users[citizenNumber]
            const { teleChatId: userTeleChatId } = user

            if (userTeleChatId === teleChatId) {
                return {
                    ...user,
                    citizenNumber
                }
            }
        }

        return null
    },

    async getUserByTeleHandle(teleHandle) {
        const snapshot = await database.ref('users').get()
        const users = snapshot.toJSON()

        if (!users) return null

        for (const citizenNumber of Object.keys(users)) {
            const user = users[citizenNumber]
            const { teleHandle: userTeleHandle } = user

            if (userTeleHandle === teleHandle) {
                return {
                    ...user,
                    citizenNumber
                }
            }
        }

        return null
    },

    async isUserExist(teleHandle) {
        const user = await this.getUserByTeleHandle(teleHandle)
        return user !== null
    },

    async updateUserLastKnownLocation(teleHandle, location) {
        const user = await this.getUserByTeleHandle(teleHandle)
        if (!user) return

        const { citizenNumber } = user
        database.ref(`users/${citizenNumber}/lastKnownLocation`).set(location)
    },

    async addHistoryAlerts(userId, location, reason) {
        const user = await this.getUserByTeleChatId(userId)
        if (!user) return

        const { citizenNumber } = user
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
            const historyLength = Object.keys(historyAlerts).length
            await database.ref(`users/${citizenNumber}/historicalAlerts`).set({
                ...historyAlerts,
                [historyLength]: {
                    location,
                    reason,
                    timestamp: Date.now()
                }
            })
        }
    },

    async isPasswordValid(chatId, password) {
        const user = await this.getUserByTeleChatId(chatId)
        if (!user) return null

        const { citizenNumber } = user
        const userPasswordSnapshot = await database.ref(`users/${citizenNumber}/password`).get()
        const userPassword = userPasswordSnapshot.val()

        console.log(userPassword)

        return true
    }
}