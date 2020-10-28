const Telegraf = require('telegraf')

const Keyboard = require('../../lib/keyboard-telegraf')
const { Key } = require('../../lib')

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const bot = new Telegraf('942081651:AAEwhN4nTNa-Ef_U6x2xqT-VOq7Efew_YTo')

const generateKeyboard = (page = 1) => {
    return Keyboard.make([...Array(4)].map((_, i) => {
        const index = i + 1

        return Key.callback(page === index ? `- ${index} - ` : `${index}`, `page:${index}`)
    })).id('keybr')
}

const keyboard = Keyboard.make(page => [...Array(4)].map((_, i) => {
    const index = i + 1
    const title = page === index ? `- ${index} - ` : `${index}`

    return Key.callback(title, `page:${index}`)
})).id('keybr')

keyboard.action('page', ctx => {
    const page = parseInt(ctx.callbackQuery.data) || 1
    const start = (page - 1) * 5
    const message = data.slice(start, start + 5).join(', ')

    return ctx.editMessageText(message, keyboard.make().inline())
})

bot.use(keyboard)

bot.start(({ reply }) => {
    const message = data.slice(0, 5).join(', ')

    return reply(message, keyboard.make(1).inline())
})

bot.launch()
