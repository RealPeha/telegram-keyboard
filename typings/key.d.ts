import { KeyboardButtonRequestChat, KeyboardButtonRequestUser, LoginUrl } from "typegram"

type PollType = 'regular' | 'quiz' | 'any'

type StyleType = 'danger' | 'success' | 'primary'

interface Button {
    text: string | number
    hide?: boolean
    icon_custom_emoji_id?: string
    style?: StyleType
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
    static text(text: Text, options?: Omit<Button, 'text'>): TextButton
    static callback(text: Text, callbackData: string | number, options?: Omit<Button, 'text'>): CallbackButton
    static url(text: Text, url: string, options?: Omit<Button, 'text'>): UrlButton
    static game(text: Text, options?: Omit<Button, 'text'>): GameButton
    static pay(text: Text, options?: Omit<Button, 'text'>): PayButton
    static contact(text: Text, options?: Omit<Button, 'text'>): ContactButton
    static location(text: Text, options?: Omit<Button, 'text'>): LocationButton
    static poll(text: Text, type: PollType, options?: Omit<Button, 'text'>): PollButton
    static user(text: Text, options: KeyboardButtonRequestUser & Omit<Button, 'text'>): UserButton
    static chat(text: Text, options: KeyboardButtonRequestChat & Omit<Button, 'text'>): ChatButton
    static login(text: Text, url: string, options?: Omit<LoginUrl, 'url'> & Omit<Button, 'text'>): LoginButton
    static switchToChat(text: Text, switchInlineQuery: string, options?: Omit<Button, 'text'>): SwitchToChatButton
    static switchToCurrentChat(text: Text, switchInlineQueryCurrentChat: string, options?: Omit<Button, 'text'>): SwitchToCurrentChatButton
    static webApp(text: Text, url: string, options?: Omit<Button, 'text'>): SwitchToCurrentChatButton
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