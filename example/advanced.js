const Telegraf = require('telegraf')
const { Keyboard } = require('../lib')

// builtIn is the alias for reply, so Keyboard.builtIn() === Keyboard.reply()
const { make, combine, builtIn } = Keyboard

const bot = new Telegraf(process.env.BOT_TOKEN)

const backKeyboard = make(['Back'])

const main = ({ reply }) => {
    // create reply keyboard markup using builtIn static method
    // this is equivalent to
    // make(['2 columns', 'random', 'pyramid'], { columns: 1 }).builtIn()
    return reply('Hello', builtIn(['2 columns', 'random', 'pyramid'], { columns: 1 }))
}

bot.start(main)
bot.hears('Back', main)

bot.hears('2 columns', ({ reply }) => {
    const keyboard = make([1, 2, 3, 4, 5, 6], { columns: 2 })

    return reply('2 columns', combine(keyboard, backKeyboard).builtIn())
})

bot.hears('random', ({ reply }) => {
    const buttons = [1, 2, 3, 4, 5, 6, 7]
    const keyboard = make(buttons, {
        wrap: row => row.length > Math.floor(Math.random() * buttons.length)
    })

    return reply('random', combine(keyboard, backKeyboard).builtIn())
})

bot.hears('pyramid', ({ reply }) => {
    const keyboard = make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], {
        wrap: (row, i) => row.length >= (i + 1) / 2
    })

    return reply('pyramid', combine(keyboard, backKeyboard).builtIn())
})

bot.startPolling()
