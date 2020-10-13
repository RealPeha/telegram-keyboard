const Keyboard = require('./keyboard')

const useKeyboard = (buttons = [], options = {}) => (ctx, next) => {
    if (ctx.session.keyboard) {
        return next()
    }

    if (buttons instanceof Keyboard) {
        ctx.session.keyboard = buttons
    } else if (typeof buttons === 'function') {
        ctx.session.keyboard = buttons()
    } else {
        ctx.session.keyboard = Keyboard.make(buttons, options)
    }

    return next()
}

module.exports = useKeyboard
