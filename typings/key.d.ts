export type PollType = 'regular' | 'quiz' | 'any'

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

export interface RequestUserOptions {
    request_id: number
    user_is_bot?: boolean
    user_is_premium?: boolean
}

export interface UserButton extends Button {
    request_user: RequestUserOptions
}

export interface ChatAdministratorRights {
    is_anonymous: boolean
    can_manage_chat: boolean
    can_delete_messages: boolean
    can_manage_video_chats: boolean
    can_restrict_members: boolean
    can_promote_members: boolean
    can_change_info: boolean
    can_invite_users: boolean
    can_post_messages?: boolean
    can_edit_messages?: boolean
    can_pin_messages?: boolean
    can_post_stories?: boolean
    can_edit_stories?: boolean
    can_delete_stories?: boolean
    can_manage_topics?: boolean
}

export interface RequestChatOptions {
    request_id: number
    chat_is_channel: boolean
    chat_is_forum?: boolean
    chat_has_username?: boolean
    chat_is_created?: boolean
    user_administrator_rights?: ChatAdministratorRights
    bot_administrator_rights?: ChatAdministratorRights
    bot_is_member?: boolean
}

export interface ChatButton extends Button {
    request_chat: RequestChatOptions
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
    static text(text: Text, hide?: boolean): TextButton
    static callback(text: Text, callbackData: string | number, hide?: boolean): CallbackButton
    static url(text: Text, url: string, hide?: boolean): UrlButton
    static game(text: Text, hide?: boolean): GameButton
    static pay(text: Text, hide?: boolean): PayButton
    static contact(text: Text, hide?: boolean): ContactButton
    static location(text: Text, hide?: boolean): LocationButton
    static poll(text: Text, type: PollType, hide?: boolean): PollButton
    static user(text: Text, options: RequestUserOptions, hide?: boolean): UserButton
    static chat(text: Text, options: RequestChatOptions, hide?: boolean): ChatButton
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