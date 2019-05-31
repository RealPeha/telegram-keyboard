# Telegraf Keyboard Builder
Simple keyboard builder for Telegraf 

## Installation
Just use npm

    npm i telegraf-keyboard --save
    
## Example

```javascript
const Telegraf = require('telegraf');
const Keyboard = require('telegraf-keyboard');
//...
const bot = new Telegraf(process.env.BOT_TOKEN);
bon.on('text', (ctx) => {
  const options = {
    inline: false, // default
    duplicates: false, // default
    newline: false, // default
  };
  const keyboard = new Keyboard(options);
  keyboard
    .add('Item 1', 'Item 2', 'Item 3') // first line
    .add('Item 10') // second line
    .remove('Item 2')
    .rename('Item 10', 'Item 2')
  ctx.reply('Keyboard', keyboard.draw());
})
```

More examples you may find in [example](https://github.com/RealPeha/telegraf-keyboard/tree/master/example)

# API
## Create keyboard
```javascript
const Keyboard = require('telegraf-keyboard');
const keyboard = new Keyboard(options);
```
### Arguments
* `options` - object (optional)

#### Options
* `inline` - if `true` then the keyboard will be inline (default: false)
* `duplicates` - if `true` then allow adding buttons with the same name (default: false)
* `newline` - if `true` each button will be on a new line else if `false` then each `add` will move button to new line (default: false)

## keyboard.add(buttons)
```javascript
keyboard
  .add('Button 1', 'Button 2')
  .add(['Button 3', 'Button 4'])
```
if the `inline` option is set then you can add an action for the button through the colon, but this is not necessary
```javascript
keyboard
  .add('Button 1:action 1', 'Button 2:action 2')
  .add(['Button 3:action 3', 'Button 4'])
```
In this example, `Button 1` has action `action 1`, `Button 2` has action `action 2`, but `Button 4` has action `Button 4`
### Arguments
* `button` - string array or arguments 

## keyboard.rename(button_old, button_new)
Not for inline keyboard
```javascript
keyboard
  .add('Button 1')
  .rename('Button 1', 'Button 0')
```
`Button 1` now has title `Button 0`

## keyboard.remove(button)
Not for inline keyboard
```javascript
keyboard
  .add('Button 1', 'Button 2')
  .remove('Button 1')
```

## keyboard.draw()
```javascript
bot.reply('Keyboard', keyboard.draw());
```

## keyboard.clear()
```javascript
bot.reply('Keyboard', keyboard.clear());
```

## keyboard.new()

## keyboard.empty()

## keyboard.exist(button)