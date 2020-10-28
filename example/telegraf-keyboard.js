const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')

const Keyboard = require('../lib/keyboard-telegraf')
const { Key } = require('../lib')

const bot = new Telegraf('942081651:AAFSUSo21yiJ5qqMeffkZO-YNCKAUTvWN-k')

const keyboard = Keyboard.make(['Button 1', 'Button 2'])
const keyboard2 = Keyboard.make(['Button 3'])

const keyboards = Composer.compose([keyboard, keyboard2])

keyboard
    .action('Button 1', (ctx) => {
        return ctx.editMessageText('Keyboard 1 (updated)', keyboard2.inline())
    })
    .action('Button 2', ({ reply, answerCbQuery }) => {
        return Composer.compose([
            reply('Yes'),
            answerCbQuery()
        ])
    })

keyboard2.action('Button 3', (ctx) => {
    console.log('keyboard2')

    return ctx.answerCbQuery()
})

bot.use(keyboards)

bot.start(async ({ reply }) => {
    return Composer.compose([
        reply('Keyboard 1', keyboard.inline()),
        reply('Keyboard 2', keyboard2.inline()),
    ])
})

// bad
// bot.on('callback_query', async (ctx) => {
//     await ctx.reply('First message')

//     return ctx.answerCbQuery()
// })

// // good
// bot.on('callback_query', ({ reply }) => {
//     return Composer.compose([
//         ctx.reply('First message'),
//         ctx.answerCbQuery(),
//     ])
// })

bot.launch()
