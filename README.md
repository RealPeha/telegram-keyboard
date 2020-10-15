# Telegram Keyboard Builder
Simple keyboard builder for Telegram Bots

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

bon.on('text', async ({ reply }) => {
  const keyboard = Keyboard.make([
    ['Button 1', 'Button 2'], // First row
    ['Button 3', 'Button 4'], // Second row
  ])

  await ctx.reply('Simple built-in keyboard', keyboard.builtIn())
  await ctx.reply('Simple inline keyboard', keyboard.inline())
})
```

More examples you may find in [example](https://github.com/RealPeha/telegram-keyboard/tree/master/example)
