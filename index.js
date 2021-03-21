require('dotenv').config()
const { database: FirebaseDb, getUserByTeleHandle } = require('./lib/FireBaseDB')
const bot = require('./lib/TelegramBot')

// TODO: setup webhooks for Telegram bot
// Telegram bot setup
bot.onText(/\/start/, require('./useCases/onboardUser'))
bot.onText(/\/trackme/, require('./useCases/trackUser'))
bot.onText(/\/sendhelp/, require('./useCases/sendHelp').handler)

bot.on('message', require('./useCases/common/messageListener'))
bot.on('callback_query', require('./useCases/common/callbackQueryListener'))

const rpcListener = (function () {
    const backendRpcObserver = FirebaseDb.ref('rpc/backend')
    backendRpcObserver.on('child_added', snapshot => {
        const { method, payload } = snapshot.toJSON()

        switch (method) {
            case 'sendUser':
                sendUserMessage(snapshot.key, payload)
                break
        }

    })
}())

async function sendUserMessage(fbRowKey, { teleHandle, message }) {
    const user = await getUserByTeleHandle(teleHandle)
    if (!user) return

    const { teleChatId } = user
    await bot.sendMessage(teleChatId, message)
    await FirebaseDb.ref(`rpc/backend/${fbRowKey}`).remove()
}