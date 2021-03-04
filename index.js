require('dotenv').config()
const bot = require('./lib/TelegramBot')

// TODO: setup webhooks for Telegram bot

// Telegram bot setup
bot.onText(/\/start/, require('./useCases/onboardUser'))

// JSON RPC setup
