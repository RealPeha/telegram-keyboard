const test = require('ava')

const { Keyboard, Key } = require('../lib')

test('should generate keyboard with 1 button', t => {
    const markup1 = Keyboard.make(['Button']).reply().reply_markup
    const markup2 = Keyboard.reply(['Button']).reply_markup
    const markup3 = Keyboard.make([['Button']]).reply().reply_markup

    const result = {
        resize_keyboard: true,
        keyboard: [
            ['Button']
        ]
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
    t.deepEqual(markup3, result)
})

test('should generate keyboard using 2D buttons array', t => {
    const markup = Keyboard.make([
        ['Button 1'],
        ['Button 2'],
    ]).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['Button 1'],
            ['Button 2'],
        ]
    })
})

test('should generate keyboard with 5 button in 2 columns', t => {
    const markup = Keyboard.make([1, 2, 3, 4, 5], { columns: 2 }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '2'],
            ['3', '4'],
            ['5'],
        ]
    })
})

test('should generate keyboard with 2 button in 2 row', t => {
    const markup = Keyboard.make([
        ['Button 1'],
        ['Button 2'],
    ]).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['Button 1'],
            ['Button 2'],
        ]
    })
})
