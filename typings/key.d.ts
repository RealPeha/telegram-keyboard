import { KeyboardButtonRequestChat, KeyboardButtonRequestUser, LoginUrl } from "typegram"

type PollType = 'regular' | 'quiz' | 'any'

interface Button {
    text: string | number
    hide?: boolean
}

type Text = number | string

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

export interface UserButton extends Button {
    request_user: KeyboardButtonRequestUser
}

export interface ChatButton extends Button {
    request_chat: KeyboardButtonRequestChat
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
    static text(text: Text, hide?: boolean): TextButton
    static callback(text: Text, callbackData: string | number, hide?: boolean): CallbackButton
    static url(text: Text, url: string, hide?: boolean): UrlButton
    static game(text: Text, hide?: boolean): GameButton
    static pay(text: Text, hide?: boolean): PayButton
    static contact(text: Text, hide?: boolean): ContactButton
    static location(text: Text, hide?: boolean): LocationButton
    static poll(text: Text, type: PollType, hide?: boolean): PollButton
    static user(text: Text, options: KeyboardButtonRequestUser, hide?: boolean): UserButton
    static chat(text: Text, options: KeyboardButtonRequestChat, hide?: boolean): ChatButton
    static login(text: Text, url: string, options?: Omit<LoginUrl, 'url'>, hide?: boolean): LoginButton
    static switchToChat(text: Text, switchInlineQuery: string, hide?: boolean): SwitchToChatButton
    static switchToCurrentChat(text: Text, switchInlineQueryCurrentChat: string, hide?: boolean): SwitchToCurrentChatButton
    static webApp(text: Text, url: string, hide?: boolean): SwitchToCurrentChatButton
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
  | UserButton
  | ChatButton