const { chunk } = require('./utils')

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
        this.options = {...Keyboard.defaultOptions, ...options }
        this.buttons = Array.isArray(buttons[0]) ? buttons : [buttons]
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

    /**
     * @description Push new row
     */
    push(...buttons) {
        if (Array.isArray(buttons[0])) {
            this.buttons.push(buttons[0])
        } else {
            this.buttons.push(buttons)
        }

        return this
    }

    /**
     * @description Pop last row
     */
    pop() {
        return this.buttons.pop()
    }

    /**
     * @description Splice rows
     */
    splice(...args) {
        this.buttons.splice(...args)

        return this
    }

    setButtons(buttons) {
        this.buttons = [...buttons]

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
            if (value) {
                this.options[option] = value
            } else {
                delete this.options[option] // all options is false by default, so we can delete this option from the options object
            }
        }

        return this
    }

    /**
     * @description Requests clients to resize the keyboard vertically for optimal
     * fit (e.g., make the keyboard smaller if there are just two rows of buttons).
     * Defaults to true
     * @param {boolean} value
     * @example
     * Keyboard.make(['Button']).resize().reply()
     * 
     * @return {Keyboard}
     */
    resize (value = true) {
        return this.setOption('resize_keyboard', value)
    }

    /**
     * @description Shows reply interface to the user, as if they manually selected
     * the bot's message and tapped 'Reply'
     * @param {boolean} value
     * @example
     * Keyboard.make(['Button']).forceReply().reply()
     * 
     * @return {Keyboard}
     */
    forceReply(value = true) {
        return this.setOption('force_reply', value)
    }

    /**
     * @description Use this parameter if you want to force reply from specific users only.
     * Targets:
     * 1) users that are `@mentioned` in the text of the `Message` object;
     * 2) if the bot's message is a reply (has `reply_to_message_id`), sender of the original message.
     * @param {boolean} value
     * @example
     * Keyboard.make(['Button']).selective().reply()
     * 
     * @return {Keyboard}
     */
    selective(value = true) {
        return this.setOption('selective', value)
    }

    /**
     * @description Requests clients to hide the keyboard as soon as it's been used.
     * The keyboard will still be available, but clients will automatically display
     * the usual letter-keyboard in the chat – the user can press a special button
     * in the input field to see the custom keyboard again. Defaults to false.
     * @param {boolean} value
     * @example
     * Keyboard.make(['Button']).oneTime().reply()
     * 
     * @return {Keyboard}
     */
    oneTime(value = true) {
        return this.setOption('one_time_keyboard', value)
    }

    /**
     * @description Requests clients to remove the custom keyboard (user will not
     * be able to summon this keyboard; if you want to hide the keyboard from sight
     * but keep it accessible, use `one_time_keyboard`
     * @param {boolean} value
     * @example
     * Keyboard.make(['Button']).removeKeyboard().reply()
     * 
     * @return {Keyboard}
     */
    removeKeyboard(value = true) {
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
        if (keyboards.find(Array.isArray)) {
            keyboards = keyboards.flat()
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
        const { columns, wrap, filter, filterAfterBuild, flat, pattern } = makeOptions

        const filterBeforeBuild = !filterAfterBuild

        const filterFunction = typeof filter === 'function'
            ? filter
            : button => !button.hide

        // for 2D buttons array
        if (!flat && buttons.every(Array.isArray)) {
            return this.setButtons(buttons
                .map(row => row.filter(filterFunction))
                .filter(row => row.length)
            )
        }

        buttons = buttons.flat(Infinity)

        if (filterBeforeBuild) {
            buttons = buttons.filter(filterFunction)
        }

        const hasPattern = Array.isArray(pattern) // && pattern.every(Number.isInteger)

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
                .filter(row => row.length)
        }

        return this.setButtons(buttons)
    }

    /**
     * @description Return inline keyboard markup
     * @param {Object} extraMarkup
     * @return {Object}
     */
    inline(extraMarkup) {
        return this.draw('inline_keyboard', this.formatInlineButtons(this.buttons), extraMarkup)
    }

    /**
     * @description Return reply keyboard markup
     * @param {Object} extraMarkup
     * @return {Object}
     */
    reply(extraMarkup) {
        return this.draw('keyboard', this.formatBuiltInButtons(this.buttons), extraMarkup)
    }

    /**
     * @description Alias for `reply` method
     * @param {Object} [extraMarkup]
     * @return {Object}
     */
    builtIn(extraMarkup) {
        return this.reply(extraMarkup)
    }

    // helpers
    draw(keyboardType, keyboardButtons = [], extraMarkup = {}) {
        const isValidButtons =
            Array.isArray(keyboardButtons) && keyboardButtons.length &&
            Array.isArray(keyboardButtons[0]) && keyboardButtons[0].length

        return {
            reply_markup: {
                ...this.options,
                ...(keyboardType && isValidButtons && { [keyboardType]: keyboardButtons }),
            },
            ...extraMarkup,
        }
    }

    formatInlineButtons(buttons) {
        return buttons.map(row => row.map(button => {
            if (typeof button === 'string' || typeof button === 'number') {
                const text = '' + button;
    
                return { text, callback_data: text };
            }
    
            if (button.type === 'text') {
                const text = '' + button.text;
    
                return { text, callback_data: text };
            }
    
            const { hide, ...restButton } = button
                
            return restButton
        }))
    }

    formatBuiltInButtons(buttons) {
        return buttons.map(row => row.map(button => {
            if (typeof button === 'object') {
                return '' + button.text
            }
    
            return '' + button
        }))
    }
    
    // getters
    get length() {
        return this.buttons.length
    }

    // static methods
    static remove() {
        return new Keyboard().resize(false).removeKeyboard().draw()
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

    /**
     * @description Shortcut for `Keyboard.make(buttons, makeOptions).inline()`
     * @param {Array} buttons
     * @param {Object} [makeOptions]
     * @param {Object} [extraMarkup]
     * @return {Object}
     */
    static inline(buttons, makeOptions = {}, extraMarkup = {}) {
        if (buttons instanceof Keyboard) {
            return buttons.inline()
        }

        return Keyboard.make(buttons, makeOptions).inline(extraMarkup)
    }

    /**
     * @description Shortcut for `Keyboard.make(buttons, makeOptions).reply()`
     * @param {Array | Keyboard} buttons
     * @param {Object} [makeOptions]
     * @param {Object} [extraMarkup]
     * @return {Object}
     */
    static reply(buttons, makeOptions = {}, extraMarkup = {}) {
        if (buttons instanceof Keyboard) {
            return buttons.reply()
        }

        return Keyboard.make(buttons, makeOptions).reply(extraMarkup)
    }

    /**
     * @description Alias for `reply` static method
     * @param {Array | Keyboard} buttons
     * @param {Object} [makeOptions]
     * @param {Object} [extraMarkup]
     * @return {Object}
     */
    static builtIn(buttons, makeOptions = {}, extraMarkup = {}) {
        return Keyboard.reply(buttons, makeOptions, extraMarkup)
    }
}

module.exports = Keyboard
