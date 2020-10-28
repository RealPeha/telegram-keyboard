const test = require('ava')

const { Keyboard, Key } = require('../lib')

test('make keyboard with 1 button and default options', t => {
    const markup1 = Keyboard.make(['Button']).inline().reply_markup
    const markup2 = Keyboard.make([['Button']]).inline().reply_markup

    const result = {
        resize_keyboard: true,
        inline_keyboard: [
            [{ text: 'Button', callback_data: 'Button'}],
        ],
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
})

test('make keyboard with another make methods', t => {
    const markup1 = Keyboard.inline(['Button']).reply_markup
    const markup2 = new Keyboard(['Button']).inline().reply_markup
    const markup3 = Keyboard.inline(new Keyboard(['Button'])).reply_markup
    const markup4 = new Keyboard().make(['Button']).inline().reply_markup

    const result = {
        resize_keyboard: true,
        inline_keyboard: [
            [{ text: 'Button', callback_data: 'Button'}],
        ],
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
    t.deepEqual(markup3, result)
    t.deepEqual(markup4, result)
})

test('make keyboard with custom callback data', t => {
    const markup = Keyboard.make([
        [Key.callback('Button 1', 'one')],
        [Key.callback('Button 2', 'two')],
    ]).inline().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        inline_keyboard: [
            [{ text: 'Button 1', callback_data: 'one'}],
            [{ text: 'Button 2', callback_data: 'two'}],
        ],
    })
})

test('make keyboard with url button', t => {
    const markup = Keyboard.make([
        Key.url('Google', 'google.com'),
    ]).inline().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        inline_keyboard: [
            [{ text: 'Google', url: 'google.com'}],
        ],
    })
})

test('make keyboard with hide button', t => {
    const markup = Keyboard.make([
        Key.callback('One', 'one'),
        Key.callback('Two', 'two', true),
    ]).inline().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        inline_keyboard: [
            [{ text: 'One', callback_data: 'one'}],
        ],
    })
})
