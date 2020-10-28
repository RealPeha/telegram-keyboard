const Composer = require('telegraf/composer')

const Keyboard = require('./keyboard')

class TelegrafKeyboard extends Keyboard {
    static prefix = 'tgk:'
    static delimiter = '//'

    constructor(...args) {
        super(...args)

        this.handlers = new Map()
        this.id = Math.floor(Math.random() * 99)
    }

    action(type, ...fns) {
        const handler = Composer.compose(fns)

        if (Array.isArray(type)) {
            type.forEach(t => this.handlers.set(t.toString(), handler))
        } else {
            this.handlers.set(type.toString(), handler)
        }

        return this
    }

    middleware() {
        return Composer.mount('callback_query', (ctx, next) => {
            if (!ctx.callbackQuery.data || !ctx.callbackQuery.data.startsWith(TelegrafKeyboard.prefix)) {
                return next(ctx)
            }

            const [prefix, keyboardId, type] = ctx.callbackQuery.data.split(TelegrafKeyboard.delimiter)

            if (parseInt(keyboardId) !== this.id) {
                return next()
            }

            const handler = this.handlers.get(type)

            return handler ? handler(ctx, next) : next(ctx)
        })
    }

    formatInlineButtons(buttons) {
        return buttons.map(row => row.map(button => {
            if (typeof button === 'string' || typeof button === 'number') {
                const text = '' + button;
    
                return { text, callback_data: this.withMetadata(text) };
            }
    
            if (button.type === 'text') {
                const text = '' + button.text;
    
                return { text, callback_data: this.withMetadata(text) };
            }
    
            const { hide, ...restButton } = button

            if (restButton.callback_data) {
                restButton.callback_data = this.withMetadata(restButton.callback_data)
            }
                
            return restButton
        }))
    }
    
    withMetadata(payload) {
        const { prefix, delimiter } = TelegrafKeyboard
        
        return `${prefix}${delimiter}${this.id}${delimiter}${payload}`
    }

    static make(buttons, makeOptions = {}) {
        return new TelegrafKeyboard().make(buttons, makeOptions)
    }
}

module.exports = TelegrafKeyboard
