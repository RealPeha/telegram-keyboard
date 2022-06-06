const Telegraf = require('telegraf')
const { Keyboard, Key } = require('../../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const ACTION_TYPES = {
    day: 'day',
    remove: 'remove'
}

const title = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const days = [...Array(30)].map((_, i) => {
    const day = (i + 1).toString()

    return Key.callback(day, `${ACTION_TYPES.day}:${day}`)
})

const titleKeyboard = Keyboard.make(title)
const dayKeyboard = Keyboard.make(days, { columns: title.length })
const keyboard = Keyboard.combine(titleKeyboard, dayKeyboard)

const actionsKeyboard = Keyboard.make([Key.callback('Remove build-in keyboard', ACTION_TYPES.remove)])
const inlineKeyboard = Keyboard.combine(keyboard, actionsKeyboard)

bot.start(async ({ reply }) => {
    await reply('Simple day selector. Build-in keyboard', keyboard.reply())
    await reply('Simple day selector. Inline keyboard', inlineKeyboard.inline())
})

bot.on('callback_query', async (ctx) => {
    const [actionType, actionData] = ctx.callbackQuery.data.split(':')

    if (actionType === ACTION_TYPES.day) {
        return ctx.answerCbQuery(actionData)
    }

    if (actionType === ACTION_TYPES.remove) {
        await ctx.reply('Removed', Keyboard.remove())
    }

    return ctx.answerCbQuery()
})

bot.launch()
