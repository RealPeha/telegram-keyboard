const Telegraf = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

const { make, combine } = Keyboard

const bot = new Telegraf(process.env.BOT_TOKEN)

const backKeyboard = make(['Back'])

const main = ({ reply }) => {
    return reply('Hello', make(['2 columns', 'random', 'pyramid'], { columns: 1 }).builtIn())
}

bot.start(main)
bot.hears('Back', main)

bot.hears('2 columns', ({ reply }) => {
    const keyboard = make(['1', '2', '3', '4', '5', '6'], { columns: 2 })

    return reply('2 columns', combine(keyboard, backKeyboard).builtIn())
})

bot.hears('random', ({ reply }) => {
    const keyboard = make(['1', '2', '3', '4', '5', '6', '7'], {
        wrap: row => row.length > Math.floor(Math.random() * 8)
    })

    return reply('2 columns', combine(keyboard, backKeyboard).builtIn())
})

bot.hears('pyramid', ({ reply }) => {
    const keyboard = make(['1', '2', '3', '4', '5', '6', '7'], {
        wrap: (row, i) => row.length >= (i + 1) / 2
    })

    return reply('pyramid', combine(keyboard, backKeyboard).builtIn())
})

bot.startPolling()
