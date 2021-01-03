const { Telegraf, session } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN)

const clamp = (n, from, to) => Math.max(from, Math.min(to, n))

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const itemsPerPage = 4
const minPage = 0
const maxPage = 2

const keyboard = Keyboard.make((page) => {
    return items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
}, { columns: 3 })

const arrows = Keyboard.make(['<----', '---->'])

bot.use(session())

bot.start(ctx => {
    ctx.session.page = 0

    return ctx.reply('Keyboard', Keyboard.combine(keyboard.construct(ctx.session.page), arrows).inline())
})

bot.on('callback_query', (ctx) => {
    const arrow = ctx.callbackQuery.data

    if (arrow === '---->') {
        ctx.session.page = clamp(ctx.session.page + 1, minPage, maxPage)
    } else if (arrow === '<----') {
        ctx.session.page = clamp(ctx.session.page - 1, minPage, maxPage)
    } else {
        return ctx.answerCbQuery()
    }

    return ctx.editMessageText('Keyboard', keyboard.construct(ctx.session.page).inline())
        .catch(() => 42)
})

bot.launch()
