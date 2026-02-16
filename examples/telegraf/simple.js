const { Telegraf } = require('telegraf')
const { Keyboard, Key } = require('../../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const mainMenuKeyboard = Keyboard.make([
    ['Main menu', 'Inline Menu'],
    ['Help'],
]).reply()

bot.start(({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Main menu', ({ reply }) => {
    return reply('Main menu', Keyboard.make(['Back']).reply())
})

bot.hears('Back', ({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Help', ({ reply }) => {
    return reply('Help', Keyboard.make(['Back']).reply())
})

bot.hears('Inline Menu', (ctx) => {
    const keyboard = Keyboard.make([
        [Key.callback('Line 1', 'hello', { style: 'danger' })],
        [Key.callback('Line 2', 'my', { style: 'success' })],
        [Key.callback('Line 3', 'friend', { style: 'primary', icon_custom_emoji_id: '5773939765413941528' })],
    ]).inline()

    return ctx.reply('Inline Keyboard', keyboard)
})

bot.on('callback_query', (ctx) => {
    return ctx.answerCbQuery(ctx.callbackQuery.data)
})

bot.hears(/.+/, (ctx) => {
    console.log('Message with dots')
    console.log(ctx.message)
})

bot.launch()
