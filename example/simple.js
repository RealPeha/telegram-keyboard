const Telegraf = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')

const { callback } = Key

const bot = new Telegraf(process.env.BOT_TOKEN)

const mainMenuKeyboard = Keyboard.make([
    ['Main menu', 'Inline Menu'],
    ['Help'],
]).builtIn()

bot.start(({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Main menu', ({ reply }) => {
    return reply('Main menu', Keyboard.make(['Back']).builtIn())
})

bot.hears('Back', ({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Help', ({ reply }) => {
    return reply('Help', Keyboard.make(['Back']).builtIn())
})

bot.hears('Inline Menu', ({ reply }) => {
    const keyboard = Keyboard.make([
        [callback('Line 1', 'hello')],
        [callback('Line 2', 'my')],
        [callback('Line 3', 'friend')],
    ]).inline()

    return reply('Inline Keyboard', keyboard)
})

bot.on('callback_query', (ctx) => {
    return ctx.answerCbQuery(ctx.callbackQuery.data)
})

bot.startPolling()
