# Telegram Keyboard Builder
Simple and powerful reply and inline keyboard builder for Telegram Bots

## Installation
Just use npm

    npm i telegram-keyboard --save
    
or yarn

    yarn add telegram-keyboard
    
## Example of use in Telegraf

```javascript
const Telegraf = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('text', async (ctx) => {
  const keyboard = Keyboard.make([
    ['Button 1', 'Button 2'], // First row
    ['Button 3', 'Button 4'], // Second row
  ])

  await ctx.reply('Simple built-in keyboard', keyboard.reply())
  await ctx.reply('Simple inline keyboard', keyboard.inline())
})
```

## Reply (build-in) keyboard

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make(['Button 1', 'Button 2']).reply()

// or using shortcut
const keyboard = Keyboard.reply(['Button 1', 'Button 2'])

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      [
        "Button 1",
        "Button 2"
      ]
    ]
  }
}
```
![](./imgs/built-in-keyboard.png)

## Inline keyboard

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make(['Button 1', 'Button 2']).inline()

// or using shortcut
const keyboard = Keyboard.inline(['Button 1', 'Button 2'])

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "inline_keyboard": [
      [
        {
          "text": "Button 1",
          "callback_data": "Button 1"
        },
        {
          "text": "Button 2",
          "callback_data": "Button 2"
        }
      ]
    ]
  }
}
```
![](./imgs/inline-keyboard.png)

## Inline keyboard with custom callback data

#### Example
```javascript
const { Keyboard, Key } = require('telegram-keyboard')

const keyboard = Keyboard.make([
  Key.callback('Button 1', 'action1'),
  Key.callback('Button 2', 'action2'),
]).inline()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "inline_keyboard": [
      [
        {
          "text": "Button 1",
          "callback_data": "action1"
        },
        {
          "text": "Button 2",
          "callback_data": "action2"
        }
      ]
    ]
  }
}
```

## Fixed columns keyboard

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make(['1', '2', '3', '4', '5'], {
  columns: 2,
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1", "2"],
      ["3", "4"],
      ["5"]
    ]
  }
}
```
![](./imgs/fixed-columns-keyboard.png)

## Calculated columns keyboard

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make(['1', '2', '3', '4', '5'], {
  wrap: (row, index, button) => Math.random() > 0.5
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [ // different every time
      ["1", "2"],
      ["3"],
      ["4"],
      ["5"]
    ]
  }
}
```
![](./imgs/calculated-columns-keyboard-2.png) ![](./imgs/calculated-columns-keyboard-1.png)

## Pattern

#### Example

In this example `pattern: [3, 1, 1]` means that the first row will have 3 buttons, the second - 1, the third - 1 and all the other buttons in the last row
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
    pattern: [3, 1, 1]
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1", "2", "3"],
      ["4"],
      ["5"],
      ["6", "7", "8", "9", "10"]
    ]
  }
}
```

## Custom filter function

Default filter function is `button => !button.hide` but you can pass your filtering function 
#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
    columns: 2,
    filter: btn => btn % 2
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1", "3"],
      ["5", "7"],
      ["9"]
    ]
  }
}
```

## Filter after build

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
    columns: 2,
    filter: btn => btn % 2,
    filterAfterBuild: true
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1"],
      ["3"],
      ["5"],
      ["7"],
      ["9"]
    ]
  }
}
```

## Flat buttons

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard = Keyboard.make([[1, 2], [3, 4, 5, 6], [7, 8, 9, 10]], {
    flat: true,
    columns: 3,
}).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      [ "10"]
    ]
  }
}
```

## Combine keyboards

#### Example
```javascript
const { Keyboard } = require('telegram-keyboard')

const keyboard1 = Keyboard.make(['1', '2', '3', '4'], {
  columns: 2
})
const keyboard2 = Keyboard.make(['5', '6', '7', '8'])

const keyboard = Keyboard.combine(keyboard1, keyboard2).reply()

console.log(keyboard)
```

#### Result
```JSON
{
  "reply_markup": {
    "resize_keyboard": true,
    "keyboard": [
      ["1", "2"],
      ["3", "4"],
      ["5", "6", "7", "8"]
    ]
  }
}
```
![](./imgs/combine-keyboards.png)

## Construct keyboard

#### Example

Full example in [examples/pagination.js](https://github.com/RealPeha/telegram-keyboard/tree/master/examples/telegraf/pagination.js)

Instead of writing a separate function to create the keyboard like this:

```javascript
const createKeyboard = page => {
  return Keyboard
    .make(/* ... */)
}
```

You can pass function to Keyboard.make method. The function must return either an array of buttons or another keyboard.
After that with the keyboard.construct(someArgs) method you can recreate it

```javascript
const { Keyboard } = require('telegram-keyboard')

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const itemsPerPage = 4

const keyboard = Keyboard.make((page) => {
    const pageItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
    
    return Keyboard.combine(
        Keyboard.make(pageItems, { columns: 3 }),
        Keyboard.make([
            Key.callback('<----', 'left', page === 0),
            Key.callback('---->', 'right', page === 2),
        ])
    )
})

// remake keyboard with some other arguments
console.log(keyboard.construct(0).reply())
console.log(keyboard.construct(1).reply())
```

More examples you may find in [examples](https://github.com/RealPeha/telegram-keyboard/tree/master/examples)
