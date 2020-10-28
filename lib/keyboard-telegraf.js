const Composer = require('telegraf/composer')

const Keyboard = require('./keyboard')

class TelegrafKeyboard extends Keyboard {
    static prefix = 'tgk:'
    static delimiter = '//'
    static payloadDelimiter = ':'

    constructor(...args) {
        super(...args)

        this.handlers = new Map()
        this.handler = Composer.passThru()
        this._id = '' + Math.floor(Math.random() * 99)
    }

    id(id) {
        this._id = id

        return this
    }

    action(type, ...fns) {
        if (typeof type === 'function') {
            this.handler = Composer.compose([type, ...fns])

            return this
        }

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

            const [, keyboardId, data] = ctx.callbackQuery.data.split(TelegrafKeyboard.delimiter)
            const [type, ...payload] = data.split(TelegrafKeyboard.payloadDelimiter)

            if (keyboardId !== this._id) {
                return next(ctx)
            }

            const handler = this.handlers.get(type) || this.handler

            if (handler) {
                ctx.callbackQuery.data = payload

                return handler(ctx, next)
            }

            return next(ctx)
        })
    }

    formatInlineButtons(buttons) {
        return buttons.map(row => row.map(button => {
            if (typeof button === 'string' || typeof button === 'number') {
                const text = '' + button;
    
                return { text, callback_data: this.formatPayload(text) };
            }
    
            if (button.type === 'text') {
                const text = '' + button.text;
    
                return { text, callback_data: this.formatPayload(text) };
            }
    
            const { hide, ...restButton } = button

            if (restButton.callback_data) {
                restButton.callback_data = this.formatPayload(restButton.callback_data)
            }
                
            return restButton
        }))
    }
    
    formatPayload(payload) {
        const { prefix, delimiter } = TelegrafKeyboard
        
        return `${prefix}${delimiter}${this._id}${delimiter}${payload}`
    }
}

module.exports = TelegrafKeyboard
