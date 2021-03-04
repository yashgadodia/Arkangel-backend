require('dotenv').config()
const bot = require('./lib/TelegramBot')

bot.onText(/\/echo (.+)/, require('./useCases/echoMessage'))