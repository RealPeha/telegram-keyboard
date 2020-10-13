const Key = require('./key')
const { chunk } = require('./utils')

class Keyboard {
    constructor(options = {}) {
        const defaultOptions = {
            resize_keyboard: true,
        }

        this.options = Object.assign(defaultOptions, options)
        this.buttons = []
        this.isInline = false
    }

    get length() {
        return this.buttons.length
    }

    clone() {
        const keyboard = Keyboard.make(this.buttons).setOptions(this.options)

        keyboard.isInline = this.isInline

        return keyboard
    }

    reset() {
        this.buttons = []

        return this
    }

    push(...buttons) {
        if (Array.isArray(buttons[0])) {
            this.buttons.push(buttons[0])
        } else {
            this.buttons.push(buttons)
        }

        return this
    }

    splice(...args) {
        this.buttons.splice(...args)

        return this
    }

    setOptions(options) {
        Object.entries(options).forEach(([option, value]) => {
            this.setOption(option, value)
        })

        return this
    }

    setOption(option, value = true) {
        this.options[option] = value

        return this
    }

    resize (value) {
        return this.setOption('resize_keyboard', value)
    }

    forceReply(value) {
        return this.setOption('force_reply', value)
    }

    selective(value) {
        return this.setOption('selective', value)
    }

    oneTime(value) {
        return this.setOption('one_time_keyboard', value)
    }

    removeKeyboard(value) {
        return this.setOption('remove_keyboard', value)
    }

    remove() {
        return Keyboard.remove()
    }

    toInline() {
        this.isInline = true

        return this
    }

    toBuiltIn() {
        this.isInline = false

        return this
    }

    make(buttons, makeOptions = {}) {
        const { columns, wrap, filter, flat } = makeOptions

        buttons = [...buttons]

        if (flat) {
            buttons = buttons.flat(Infinity)
        }

        if (!flat && buttons.find(Array.isArray)) {
            if (filter) {
                buttons = buttons.map(row => row.filter(filter))
            }

            this.buttons = buttons
        } else {
            if (filter) {
                buttons = buttons.filter(filter)
            }

            if (columns) {
                this.buttons = chunk(buttons, columns)
            } else if (wrap) {
                if (typeof wrap !== 'function') {
                    throw new Error('wrap must be a function')
                }

                let rowIndex = 0

                const result = Object.values(buttons.reduce((acc, button, index) => {
                    let currentRow = acc[rowIndex] || []

                    if (currentRow.length && wrap(currentRow, index, button)) {
                        rowIndex += 1

                        currentRow = []
                    }

                    return {
                        ...acc,
                        [rowIndex]: [...currentRow, button]
                    }
                }, {}))

                this.buttons = result
            } else {
                this.buttons = [buttons]
            }
        }

        return this
    }

    draw(extraOptions = {}) {
        const keyboardType = this.isInline ? 'inline_keyboard' : 'keyboard'

        return {
            reply_markup: {
                ...this.options,
                [keyboardType]: this.isInline
                    ? this.formatInlineButtons(this.buttons)
                    : this.buttons,
            },
            ...extraOptions,
        }
    }

    formatInlineButtons(buttons) {
        return buttons.map(row => row.map(button => {
            if (typeof button === 'string') {
                return Key.callback(button)
            }

            return button
        }))
    }
    
    static remove() {
        return new Keyboard().removeKeyboard().draw()
    }

    static make(buttons, makeOptions = {}) {
        return new Keyboard().make(buttons, makeOptions)
    }

    static combine(...keyboards) {
        const combinedKeyboard = new Keyboard()

        keyboards.forEach(keyboard => {
            if (keyboard instanceof Keyboard) {
                combinedKeyboard.setOptions(keyboard.options)
                
                if (keyboard.buttons.find(Array.isArray)) {
                    keyboard.buttons.forEach(buttons => {
                        combinedKeyboard.push(buttons)
                    })
                } else {
                    combinedKeyboard.push(keyboard.buttons)
                }
            }
        })

        return combinedKeyboard
    }
}

module.exports = Keyboard
