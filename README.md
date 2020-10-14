# Telegraf Keyboard Builder
Simple keyboard builder for Telegraf 

## Installation
Just use npm

    npm i telegraf-keyboard --save
    
or yarn

    yarn add telegraf-keyboard
    
## Example of use

```javascript
const Telegraf = require('telegraf')
const { Keyboard } = require('telegraf-keyboard')

const bot = new Telegraf(process.env.BOT_TOKEN)

bon.on('text', async ({ reply }) => {
  const keyboard = Keyboard.make([
    ['Button 1', 'Button 2'], // First row
    ['Button 3', 'Button 4'], // Second row
  ])

  await ctx.reply('Simple built-in keyboard', keyboard.builtIn())
  await ctx.reply('Simple inline keyboard', keyboard.inline())
})
```

More examples you may find in [example](https://github.com/RealPeha/telegraf-keyboard/tree/master/example)
