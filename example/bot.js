const Telegraf = require('telegraf'),
      Keyboard = require('../lib/keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN)

const mainMenuKeyboard = (new Keyboard())
    .add('Main menu', 'Inline Menu')
    .add('Help')

bot.start((ctx) => {
    ctx.reply('Simple Keyboard', mainMenuKeyboard.draw())
})
.hears('Main menu', ctx => {
    const keyboard = new Keyboard()
    keyboard.add('Back')
    ctx.reply('Main menu', keyboard.draw())
})
.hears('Back', (ctx) => {
    ctx.reply('Simple Keyboard', mainMenuKeyboard.draw())
})
.hears(['Help', '42'], (ctx) => {
    mainMenuKeyboard
        .rename('Help', '42')
    ctx.reply('Answer to the Ultimate Question of Life, the Universe, and Everything', mainMenuKeyboard.draw())
})
.hears('Inline Menu', (ctx) => {
    const keyboard = new Keyboard({
        inline: true,
        newline: true,
    })
    keyboard
        .add('Line 1:hello', 'Line 2:my', 'Line 3:friend')
    ctx.reply('Inline Keyboard', keyboard.draw())
})
.on('callback_query', (ctx) => {
    ctx.answerCbQuery(ctx.callbackQuery.data)
})

bot.startPolling()