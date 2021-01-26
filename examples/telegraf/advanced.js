const Telegraf = require('telegraf')
const { Keyboard } = require('../../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const backKeyboard = Keyboard.make(['Back'])

const main = (ctx) => {
    // create reply keyboard markup using reply static method
    // this is equivalent to
    // Keyboard.make(['2 columns', 'random', 'pyramid'], { columns: 1 }).reply()
    return ctx.reply('Hello', Keyboard.reply(['2 columns', 'random', 'pyramid'], { columns: 1 }))
}

bot.start(main)
bot.hears('Back', main)

bot.hears('2 columns', (ctx) => {
    const keyboard = Keyboard.make([1, 2, 3, 4, 5, 6], { columns: 2 })

    return ctx.reply('2 columns', Keyboard.combine(keyboard, backKeyboard).reply())
})

bot.hears('random', (ctx) => {
    const buttons = [1, 2, 3, 4, 5, 6, 7]
    const keyboard = Keyboard.make(buttons, {
        wrap: row => row.length > Math.floor(Math.random() * buttons.length)
    })

    return ctx.reply('random', Keyboard.combine(keyboard, backKeyboard).reply())
})

bot.hears('pyramid', (ctx) => {
    const keyboard = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], {
        wrap: (row, i) => row.length >= (i + 1) / 2
    })

    return ctx.reply('pyramid', Keyboard.combine(keyboard, backKeyboard).reply())
})

bot.launch()
