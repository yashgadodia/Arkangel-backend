require('dotenv').config()
const bot = require('./lib/TelegramBot')

// setup firebase 
var admin = require("firebase-admin");

var serviceAccount = require("./arkangel-firebase-firebase-adminsdk-2r4vg-e5cf136274.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://arkangel-firebase-default-rtdb.firebaseio.com"
});

let database = admin.database();
console.log(database)

var userId = '123';
var ic = 's99'
var telenum = '999';
var pass = '123';
var name = 'halimah yacob';
var add = '420 oxley';
var photoLink = 'http:...';
var location = '69 oxley road';
var safe = false ;

function writeUserData(userId,ic, telenum, pass, name, add, photoLink, location,safe ) {
    admin.database().ref('users/' + userId).set({
        ICNumber: ic,
        TeleHandle: telenum,
        Password: pass,
        Name: name,
        Address: add,
        PhotoLink: photoLink,
        Location: location,
        Safe: safe
    });
}
writeUserData(userId,ic,telenum, pass, name,add,photoLink,location, safe)

var superUsername = 'superuser'
var superPass = 'password'
function createSuperUser(superUsername,superPass) {
    admin.database().ref('superuser/' + superUsername).set({
        pass: superPass
    })
}
createSuperUser(superUsername, superPass)

// var userId = 'id2' // get from tele
// admin.database().ref('users/' + userId).set({
//     ic: 's97...',
//     telehandle: '@yashgadodia',
//     password: 'something',
//     name: 'Gash Yadodia',
//     address: '420 oxley road',
//     photolink: 'http:....',
//     location: 'i am gone',
//     safe: true
// });

    
// uuidv4() {
//     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//       (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//     );
//   }, 
// TODO: setup webhooks for Telegram bot

// Telegram bot setup
bot.onText(/\/start/, require('./useCases/onboardUser').handler)
bot.onText(/\/sendhelp/, require('./useCases/sendHelp'))
bot.on('message', require('./useCases/common/messageListener'))

// JSON RPC setup
