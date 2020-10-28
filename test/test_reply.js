const test = require('ava')

const { Keyboard, Key } = require('../lib')

test('make keyboard with 1 button and default options', t => {
    const markup1 = Keyboard.make(['Button']).reply().reply_markup
    const markup2 = Keyboard.make([['Button']]).reply().reply_markup

    const result = {
        resize_keyboard: true,
        keyboard: [
            ['Button'],
        ],
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
})

test('make keyboard with another make methods', t => {
    const markup1 = Keyboard.reply(['Button']).reply_markup
    const markup2 = new Keyboard(['Button']).reply().reply_markup
    const markup3 = Keyboard.reply(new Keyboard(['Button'])).reply_markup
    const markup4 = new Keyboard().make(['Button']).reply().reply_markup

    const result = {
        resize_keyboard: true,
        keyboard: [
            ['Button'],
        ],
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
    t.deepEqual(markup3, result)
    t.deepEqual(markup4, result)
})

test('make keyboard with 2D buttons array', t => {
    const markup = Keyboard.make([
        ['Button 1'],
        ['Button 2'],
    ]).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['Button 1'],
            ['Button 2'],
        ],
    })
})

test('make keyboard with columns option', t => {
    const markup = Keyboard.make([1, 2, 3, 4, 5], {
        columns: 2,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '2'],
            ['3', '4'],
            ['5'],
        ],
    })
})

test('make keyboard with custom wrap function', t => {
    const markup = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], {
        wrap: (row, i) => row.length >= (i + 1) / 2,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1'],
            ['2', '3'],
            ['4', '5', '6', '7'],
            ['8', '9', '10', '11', '12', '13', '14', '15'],
        ],
    })
})

test('make keyboard with pattern option', t => {
    const markup = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
        pattern: [2, 4, 1],
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '2'],
            ['3', '4', '5', '6'],
            ['7'],
            ['8', '9', '10'],
        ],
    })
})

test('make keyboard with hide buttons', t => {
    const markup = Keyboard.make([Key.text(1, true), 2, 3]).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['2', '3'],
        ],
    })
})

test('make keyboard with hide buttons and columns', t => {
    const markup = Keyboard.make([Key.text(1, true), 2, 3], {
        columns: 2,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['2', '3'],
        ],
    })
})

test('make keyboard with hide buttons and columns and filterAfterBuild option', t => {
    const markup = Keyboard.make([Key.text(1, true), 2, 3], {
        columns: 2,
        filterAfterBuild: true,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['2'],
            ['3'],
        ],
    })
})

test('make keyboard with flat option', t => {
    const markup = Keyboard.make([[1], 2, [[[[3]]]]], {
        flat: true,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '2', '3'],
        ],
    })
})

test('make keyboard with flat and columns option', t => {
    const markup = Keyboard.make([[1], 2, [[[[3]]]]], {
        flat: true,
        columns: 2,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '2'],
            ['3'],
        ],
    })
})

test('make keyboard with custom filter function', t => {
    const markup = Keyboard.make([1, 2, Key.text(3, true), Key.text(4, true)], {
        filter: button => (button.text || button) % 2,
    }).reply().reply_markup

    t.deepEqual(markup, {
        resize_keyboard: true,
        keyboard: [
            ['1', '3'],
        ],
    })
})

test('make keyboard with empty buttons', t => {
    const markup1 = Keyboard.make([]).reply().reply_markup
    const markup2 = Keyboard.make([[]]).reply().reply_markup

    const result = {
        resize_keyboard: true,
    }

    t.deepEqual(markup1, result)
    t.deepEqual(markup2, result)
})

test('make remove keyboard', t => {
    const markup = Keyboard.remove().reply_markup

    const result = {
        remove_keyboard: true,
    }

    t.deepEqual(markup, result)
})
