const Markup = require('telegraf/markup')

const flat = (arr) => arr.reduce((acc, val) => acc.concat(val), [])

module.exports = class {
    constructor(opts) {
        this.options = Object.assign({
            duplicates: false,
            inline: false,
            inlineSeparator: ':',
            newline: false
        }, opts)
        this.buttons = []
        this.buttons[0] = []
        this.line = 0
    }

    new() {
        this.buttons = []
        this.buttons[0] = []
        this.line = 0
        return this
    }

    add(...buts) {
        if (Array.isArray(buts[0])) {
            buts = buts[0]
        }
        for (let but of buts) {
            if ((!this.exist(but) && but) || this.options.duplicates) {
                if (this.options.inline) {
                    const butt = but.split(this.options.inlineSeparator)
                    this.buttons[this.line].push(Markup.callbackButton(butt[0], butt[1] || butt[0]))
                } else {
                    this.buttons[this.line].push(but)
                }
            }
            if (this.options.newline) {
                this.next()
            }
        }
        this.fix()
        this.next()
        return this
    }

    next() {
        this.line++
        this.buttons[this.line] = []
    }

    exist(but) {
        for (let i in this.buttons) {
            if (this.buttons[i].includes(but)) {
                return true
            }
        }
        return false
    }

    remove(but) {
        for (let i in this.buttons) {
            if (this.buttons[i].includes(but)) {
                this.buttons[i].splice(this.buttons[i].indexOf(but), 1)
            }
        }
        this.fix()
        return this
    }

    fix() {
        for (let i in this.buttons) {
            if (!this.buttons[i].length) {
                this.buttons.splice(i, 1)
                this.line--
            }
        }
    }

    rename(but, newbut) {
        for (let i in this.buttons) {
            if (this.buttons[i].includes(but)) {
                this.buttons[i][this.buttons[i].indexOf(but)] = newbut
            }
        }
        return this
    }

    empty() {
        return !this.buttons.length ? true : false
    }

    draw(group = false) {
        const buttons = group ? flat(this.buttons) : this.buttons
        if (this.options.inline) {
            return Markup.inlineKeyboard(buttons, group || {}).extra({parse_mode: 'HTML'})
        } else {
            return Markup.keyboard(buttons, group || {}).resize().extra()
        }
    }

    clear() {
        return Markup.removeKeyboard().extra()
    }
}