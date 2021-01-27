const { Keyboard } = require('./lib')

console.log(JSON.stringify(Keyboard.make([[1, 2], [3, 4, 5, 6], [7, 8, 9, 10]], {
    flat: true,
    columns: 3,
}).reply(), null, 2))