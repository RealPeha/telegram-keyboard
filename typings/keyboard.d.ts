import { KeyboardButton } from './key.d'
import { InlineKeyboardMarkup } from 'typegram/inline'
import { ReplyKeyboardMarkup, ReplyKeyboardRemove } from 'typegram/callback'

export interface ExtraMarkup {
    resize_keyboard?: boolean;
    force_reply?: boolean;
    selective?: boolean;
    one_time_keyboard?: boolean;
    remove_keyboard?: boolean;
    input_field_placeholder?: string;
}

export interface MakeOptions {
    columns: number;
    wrap: (
        row: string[] | number[] | KeyboardButton[],
        index: number,
        rowIndex: number,
        button: number | string | KeyboardButton,
    ) => boolean;
    filter: (
        button: number | string | KeyboardButton,
        index: number,
        buttons: string[] | number[] | KeyboardButton[],
    ) => boolean;
    filterAfterBuild: boolean;
    flat: boolean;
    pattern: number[];
}

export type Buttons =
  | string[] | string[][]
  | number[] | number[][]
  | KeyboardButton[] | KeyboardButton[][]

export type MakeFunction = (...args: any[]) => Keyboard | Buttons

export declare class Keyboard {
    markupOptions: ExtraMarkup
    buttons: Buttons
    makeFunction: MakeFunction | null
    makeOptions: MakeOptions

    constructor(buttons?: Buttons, markupOptions?: ExtraMarkup)

    /**
     * @description Make a copy of the Keyboard instance
     * @example
     * const keyboard = Keyboard.make(['Button'])
     * const clone = keyboard.clone()
     * 
     * console.log(keyboard !== clone)
     * console.log(keyboard.buttons !== clone.buttons)
     */
    clone(): this

    /**
     * @description Removes all buttons and options from the keyboard
     * @example
     * const keyboard = Keyboard.make(['Button'])
     * keyboard.reset()
     */
    reset(): this

    setButtons(buttons: Buttons): this

    setOptions(options: ExtraMarkup): this

    setOption(option: keyof ExtraMarkup, value?: boolean | string): this

    /**
     * @description Requests clients to resize the keyboard vertically for optimal
     * fit (e.g., make the keyboard smaller if there are just two rows of buttons).
     * Defaults to true
     * @example
     * Keyboard.make(['Button']).resize().reply()
     */
    resize(value?: boolean): this

    /**
     * @description Shows reply interface to the user, as if they manually selected
     * the bot's message and tapped 'Reply'
     * @example
     * Keyboard.make(['Button']).forceReply().reply()
     */
    forceReply(value?: boolean): this

    /**
     * @description Use this parameter if you want to force reply from specific users only.
     * Targets:
     * 1) users that are `@mentioned` in the text of the `Message` object;
     * 2) if the bot's message is a reply (has `reply_to_message_id`), sender of the original message.
     * @example
     * Keyboard.make(['Button']).selective().reply()
     */
    selective(value?: boolean): this

    /**
     * @description Requests clients to hide the keyboard as soon as it's been used.
     * The keyboard will still be available, but clients will automatically display
     * the usual letter-keyboard in the chat – the user can press a special button
     * in the input field to see the custom keyboard again. Defaults to false.
     * @example
     * Keyboard.make(['Button']).oneTime().reply()
     */
    oneTime(value?: boolean): this

    /**
     * @description The placeholder to be shown in the input field when the
     * keyboard is active; 1-64 characters
     * @example
     * Keyboard.make(['Button']).inputPlaceholder('Hello').reply()
     */
    inputPlaceholder(placeholder?: string): this

    /**
     * @description Requests clients to remove the custom keyboard (user will not
     * be able to summon this keyboard; if you want to hide the keyboard from sight
     * but keep it accessible, use `one_time_keyboard`
     * @example
     * Keyboard.make(['Button']).removeKeyboard().reply()
     */
    removeKeyboard(value?: boolean): this

    remove(): { reply_markup: ReplyKeyboardRemove }

    /**
     * @description Merge two or more keyboards into one
     * @example
     * const keyboard1 = Keyboard.make(['Button 1', 'Button 2', 'Button 3', 'Button 4'], { columns: 2 })
     * const keyboard2 = Keyboard.make(['Button 2'])
     * const keyboard = Keyboard.combine(keyboard1, keyboard2)
     */
    combine(...keyboards: Keyboard[]): this

    construct(...args: any[]): this

    make(buttons: Buttons | MakeFunction, makeOptions?: MakeOptions): this

    /** Returns inline keyboard markup */
    inline(extra?: Record<string, any>): { reply_markup: InlineKeyboardMarkup }

    /** Returns reply keyboard markup */
    reply(extra?: Record<string, any>): { reply_markup: ReplyKeyboardMarkup }

    /**
     * Alias for `reply` method
     * @deprecated use `reply` instead
     */
    builtIn(extra?: Record<string, any>): { reply_markup: ReplyKeyboardMarkup }

    /** Returns number of rows */
    get length(): number

    /** Remove reply keyboard */
    static remove(): { reply_markup: ReplyKeyboardRemove }

    static make(buttons: Buttons | MakeFunction, makeOptions?: MakeOptions): Keyboard

    /**
     * @description Merge two or more keyboards into one
     * @example
     * const keyboard1 = Keyboard.make(['Button 1', 'Button 2', 'Button 3', 'Button 4'], { columns: 2 })
     * const keyboard2 = Keyboard.make(['Button 2'])
     * const keyboard = Keyboard.combine(keyboard1, keyboard2)
     */
     static combine(...keyboards: Keyboard[]): Keyboard

    /**
     * @description Make a copy of the Keyboard instance
     * @example
     * const keyboard = Keyboard.make(['Button'])
     * const clone = Keyboard.clone(keyboard)
     * 
     * console.log(keyboard !== clone)
     * console.log(keyboard.buttons !== clone.buttons)
     */
    static clone(keyboard: Keyboard): Keyboard

    /** Returns inline keyboard markup */
    static inline(buttons: Buttons, makeOptions?: MakeOptions, extra?: Record<string, any>): { reply_markup: InlineKeyboardMarkup }

    /** Returns reply keyboard markup */
    static reply(buttons: Buttons, makeOptions?: MakeOptions, extra?: Record<string, any>): { reply_markup: ReplyKeyboardMarkup }

    /**
     * Alias for `Keyboard.reply` method
     * @deprecated use `reply` instead
     */
    static builtIn(buttons: Buttons, makeOptions?: MakeOptions, extra?: Record<string, any>): { reply_markup: ReplyKeyboardMarkup }
}
