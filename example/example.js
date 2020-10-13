const Telegraf = require('telegraf')

const { Keyboard, Key, useKeyboard } = require('../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const title = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const days = [...Array(30)].map((_, i) => (i + 1).toString()) // 1 - 30

const titleKeys = Keyboard.make(title)
const dayKeys = Keyboard.make(days, { columns: title.length })

const keyboard = Keyboard.combine(titleKeys, dayKeys)
keyboard.push(Key.callback('Remove build-in keyboard', 'remove'))

bot.start(async ({ reply }) => {
    await reply('Simple day selector', keyboard.draw())
    await reply('Simple day selector', keyboard.toInline().draw())
})

bot.action('remove', async ({ answerCbQuery, reply }) => {
    await reply('Removed', Keyboard.remove())

    return answerCbQuery()
})

bot.action(/.+/, ({ answerCbQuery, match }) => {
    return answerCbQuery(match[0])
})

bot.startPolling()
