export type PollType = 'poll' | 'quiz'

interface Button {
    text: string | number
    hide?: boolean
}

export interface TextButton extends Button {
    type: string
}

export interface CallbackButton extends Button {
    callback_data: string | number
}

export interface UrlButton extends Button {
    url: string
}

export interface GameButton extends Button {
    callback_game: object
}

export interface PayButton extends Button {
    pay: boolean
}

export interface ContactButton extends Button {
    request_contact: boolean
}

export interface LocationButton extends Button {
    request_location: boolean
}

export interface PollButton extends Button {
    request_poll: {
        type: PollType
    }
}

export interface LoginUrl {
    url: string
    forward_text?: string
    bot_username?: string
    request_write_access?: boolean
}

export interface LoginButton extends Button {
    login_url: LoginUrl
}

export interface SwitchToChatButton extends Button {
    switch_inline_query: string
}

export interface SwitchToCurrentChatButton extends Button {
    switch_inline_query_current_chat: string
}

export interface WebAppButton extends Button {
    web_app: {
        url: string
    }
}

export declare class Key {
    static text(text: number | string, hide?: boolean): TextButton
    static callback(text: number | string, callbackData: string | number, hide?: boolean): CallbackButton
    static url(text: number | string, url: string, hide?: boolean): UrlButton
    static game(text: number | string, hide?: boolean): GameButton
    static pay(text: number | string, hide?: boolean): PayButton
    static contact(text: number | string, hide?: boolean): ContactButton
    static location(text: number | string, hide?: boolean): LocationButton
    static poll(text: number | string, type: PollType, hide?: boolean): PollButton
    static login(text: number | string, url: string, options?: Omit<LoginUrl, 'url'>, hide?: boolean): LoginButton
    static switchToChat(text: number | string, switchInlineQuery: string, hide?: boolean): SwitchToChatButton
    static switchToCurrentChat(text: number | string, switchInlineQueryCurrentChat: string, hide?: boolean): SwitchToCurrentChatButton
    static webApp(text: number | string, url: string, hide?: boolean): SwitchToCurrentChatButton
}

export type KeyboardButton =
  | TextButton
  | CallbackButton
  | UrlButton
  | GameButton
  | PayButton
  | ContactButton
  | LocationButton
  | PollButton
  | LoginButton
  | SwitchToChatButton
  | SwitchToCurrentChatButton
  | WebAppButton
