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

        console.log(reaminingUserInfo)

        database.ref(`users/${identityNumber}`).set(reaminingUserInfo)
    }
}


