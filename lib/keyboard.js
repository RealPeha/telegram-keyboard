const {
    chunk,
    convertToCallbackButtons,
    convertNumberToStringButtons,
} = require('./utils')

const availableOptions = [
    'resize_keyboard',
    'force_reply',
    'selective',
    'one_time_keyboard',
    'remove_keyboard'
]

class Keyboard {
    static defaultOptions = {
        resize_keyboard: true,
    }

    constructor(buttons = [], options = {}) {
        this.options = Object.assign(Keyboard.defaultOptions, options)
        this.buttons = buttons
    }

    /**
     * @description Makes a copy of the Keyboard instance
     * @example
     * const keyboard = Keyboard.make(['Button'])
     * const clone = keyboard.clone()
     * 
     * console.log(keyboard !== clone)
     * console.log(keyboard.buttons !== clone.buttons)
     * 
     * @return {Keyboard}
     */
    clone() {
        const keyboard = Keyboard.make(this.buttons).setOptions(this.options)

        return keyboard
    }

    /**
     * @description Removes all buttons from the keyboard
     * @example
     * const keyboard = Keyboard.make(['Button'])
     * keyboard.reset()
     * 
     * @return {Keyboard}
     */
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

    pop() {
        return this.buttons.pop()
    }

    splice(...args) {
        this.buttons.splice(...args)

        return this
    }

    setButtons(buttons) {
        this.buttons = buttons

        return this
    }

    setOptions(options) {
        Object.entries(options).forEach(([option, value]) => {
            this.setOption(option, value)
        })

        return this
    }

    setOption(option, value = true) {
        if (availableOptions.includes(option)) {
            this.options[option] = value
        }

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

    /**
     * @description Merge two or more keyboards into one
     * @param {Keyboard} keyboards List of keyboards
     * @example
     * const keyboard1 = Keyboard.make(['Button 1'])
     * const keyboard2 = Keyboard.make(['Button 2'])
     * const keyboard = Keyboard.combine(keyboard1, keyboard2)
     * 
     * @return {Keyboard}
     */
    combine(...keyboards) {
        if (Array.isArray(keyboards[0])) {
            keyboards = keyboards[0]
        }
        
        keyboards.forEach(keyboard => {
            if (keyboard instanceof Keyboard) {
                this.setOptions(keyboard.options)
                
                if (keyboard.buttons.find(Array.isArray)) {
                    keyboard.buttons.forEach(buttons => {
                        this.push(buttons)
                    })
                } else {
                    this.push(keyboard.buttons)
                }
            }
        })

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
                    throw new Error('`wrap` must be a function')
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

    inline(extraOptions) {
        return this.draw('inline_keyboard', convertToCallbackButtons(this.buttons), extraOptions)
    }

    builtIn(extraOptions) {
        return this.draw('keyboard', convertNumberToStringButtons(this.buttons), extraOptions)
    }

    draw(keyboardType, keyboardButtons = [], extraOptions = {}) {
        return {
            reply_markup: {
                ...this.options,
                [keyboardType]: keyboardButtons,
            },
            ...extraOptions,
        }
    }
    
    get length() {
        return this.buttons.length
    }

    static remove() {
        return new Keyboard().removeKeyboard().draw()
    }

    static make(buttons, makeOptions = {}) {
        return new Keyboard().make(buttons, makeOptions)
    }

    static combine(...keyboards) {
        return new Keyboard().combine(keyboards)
    }

    static clone(keyboard) {
        return keyboard.clone()
    }

    static inline(keyboard) {
        return keyboard.inline()
    }

    static builtIn(keyboard) {
        return keyboard.builtIn()
    }
}

module.exports = Keyboard
