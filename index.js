require('dotenv').config()
const bot = require('./lib/TelegramBot')

// TODO: setup webhooks for Telegram bot
// Telegram bot setup
bot.onText(/\/start/, require('./useCases/onboardUser'))
bot.onText(/\/trackme/, require('./useCases/trackUser').handler)
bot.onText(/\/sendhelp/, require('./useCases/sendHelp').handler)

bot.on('message', require('./useCases/common/messageListener'))
bot.on('callback_query', require('./useCases/common/callbackQueryListener'))