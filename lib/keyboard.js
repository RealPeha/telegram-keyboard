const { chunk } = require('./utils')

const notEmpty = arr => arr.length

const formatInlineButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'string' || typeof button === 'number') {
            const text = `${button}`

            return { text, callback_data: text }
        }

        if (button.type === 'text') {
            const text = `${button.text}`

            return { text, callback_data: text }
        }

        const { hide, ...restButton } = button
            
        return restButton
    }))
}

const formatBuiltInButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'object') {
            if (button.request_contact || button.request_location) {
                return button
            }

            return `${button.text}`
        }

        return `${button}`
    }))
}

class Keyboard {
    static defaultMarkupOptions = {
        resize_keyboard: true,
    }

    constructor(buttons = [], markupOptions = {}) {
        this.markupOptions = {...Keyboard.defaultMarkupOptions, ...markupOptions }
        this.buttons = Array.isArray(buttons[0]) ? buttons : [buttons]
        this.makeFunction = null
        this.makeOptions = {}
    }

    clone() {
        return Keyboard.make(this.buttons).setOptions(this.markupOptions)
    }

    reset() {
        this.markupOptions = {...Keyboard.defaultMarkupOptions }
        this.buttons = []
        this.makeFunction = null
        this.makeOptions = {}

        return this
    }

    setButtons(buttons) {
        this.buttons = buttons.filter(notEmpty)

        return this
    }

    setOptions(options) {
        Object.entries(options).forEach(([option, value]) => {
            this.setOption(option, value)
        })

        return this
    }

    setOption(option, value) {
        if (value) {
            this.markupOptions[option] = value
        } else {
            delete this.markupOptions[option]
        }

        return this
    }

    resize (value = true) {
        return this.setOption('resize_keyboard', value)
    }

    forceReply(value = true) {
        return this.setOption('force_reply', value)
    }

    selective(value = true) {
        return this.setOption('selective', value)
    }

    oneTime(value = true) {
        return this.setOption('one_time_keyboard', value)
    }

    inputPlaceholder(placeholder) {
        if (placeholder && placeholder.length > 64) {
            throw new Error('Input placeholder must be between 1 and 64 characters long')
        }

        return this.setOption('input_field_placeholder', placeholder)
    }

    removeKeyboard(value = true) {
        return this.setOption('remove_keyboard', value)
    }

    remove() {
        return Keyboard.remove()
    }

    combine(...keyboards) {
        keyboards
            .flat()
            .filter(keyboard => keyboard instanceof Keyboard)
            .forEach(keyboard => {
                this.setButtons([
                    ...this.buttons,
                    ...keyboard.buttons,
                ])

                this.setOptions({
                    ...this.markupOptions,
                    ...keyboard.markupOptions,
                })
            })

        return this
    }

    construct(...args) {
        if (!this.makeFunction) {
            throw new Error('You didn\'t pass a function to the make method')
        }

        const makeResult = this.makeFunction(...args)

        if (makeResult instanceof Keyboard) {
            return Keyboard.make(makeResult.buttons, makeResult.makeOptions)
        }

        return Keyboard.make(makeResult, this.makeOptions)
    }

    make(buttons, makeOptions = {}) {
        this.makeOptions = makeOptions

        if (typeof buttons === 'function') {
            this.makeFunction = buttons

            return this
        }

        const { columns, wrap, filter, filterAfterBuild, flat, pattern } = makeOptions

        const filterBeforeBuild = !filterAfterBuild

        const filterFunction = typeof filter === 'function'
            ? filter
            : button => !button.hide

        if (!Array.isArray(buttons)) {
            buttons = [buttons]
        }

        // for 2D buttons array
        if (!flat && buttons.every(Array.isArray)) {
            return this.setButtons(buttons
                .map(row => row.filter(filterFunction))
                .filter(notEmpty)
            )
        }

        buttons = buttons.flat(Infinity)

        if (filterBeforeBuild) {
            buttons = buttons.filter(filterFunction)
        }

        const hasPattern = pattern && Array.isArray(pattern)

        if (typeof columns === 'number') {
            buttons = chunk(buttons, columns)
        } else if (typeof wrap === 'function' || hasPattern) {
            const wrapFunction = hasPattern
                ? (row, i, rowIndex) => row.length === pattern[rowIndex]
                : wrap

            let rowIndex = 0
            
            buttons = Object.values(buttons.reduce((acc, button, index) => {
                let currentRow = acc[rowIndex] || []

                if (currentRow.length && wrapFunction(currentRow, index, rowIndex, button)) {
                    rowIndex += 1

                    currentRow = []
                }

                return {
                    ...acc,
                    [rowIndex]: [...currentRow, button]
                }
            }, {}))
        } else {
            buttons = [buttons]
        }

        if (filterAfterBuild) {
            buttons = buttons
                .map(row => row.filter(filterFunction))
                .filter(notEmpty)
        }

        return this.setButtons(buttons)
    }

    inline(extra) {
        return this.draw('inline_keyboard', formatInlineButtons(this.buttons), extra)
    }

    reply(extra) {
        return this.draw('keyboard', formatBuiltInButtons(this.buttons), extra)
    }

    builtIn(extra) {
        return this.reply(extra)
    }

    // helpers
    draw(keyboardType, buttons = [], extra = {}) {
        const isValidButtons =
            Array.isArray(buttons) && buttons.length &&
            Array.isArray(buttons[0]) && buttons[0].length

        return {
            reply_markup: {
                ...this.markupOptions,
                ...(keyboardType && isValidButtons && { [keyboardType]: buttons }),
            },
            ...extra,
        }
    }
    
    // getters
    get length() {
        return this.buttons.length
    }
    
    // static methods
    static remove() {
        return new Keyboard().resize(false).removeKeyboard().reply()
    }

    static make(buttons, makeOptions = {}) {
        return new Keyboard().make(buttons, makeOptions)
    }

    static combine(...keyboards) {
        return new Keyboard().combine(...keyboards)
    }

    static clone(keyboard) {
        return keyboard.clone()
    }

    static inline(buttons, makeOptions = {}, extra = {}) {
        if (buttons instanceof Keyboard) {
            return buttons.inline()
        }

        return Keyboard.make(buttons, makeOptions).inline(extra)
    }

    static reply(buttons, makeOptions = {}, extra = {}) {
        if (buttons instanceof Keyboard) {
            return buttons.reply()
        }

        return Keyboard.make(buttons, makeOptions).reply(extra)
    }

    static builtIn(buttons, makeOptions = {}, extra = {}) {
        return Keyboard.reply(buttons, makeOptions, extra)
    }
}

module.exports = Keyboard
