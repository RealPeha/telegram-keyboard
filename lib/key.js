class Key {
    static text(text, options = {
            hide: false,
    }) {
        return { text, type: 'text', ...options }
    }
    static callback(text, callbackData, options = {
            hide: false,
    }) {
        return { text, callback_data: callbackData || text, ...options }
    }
    static url(text, url, options = {
            hide: false,
    }) {
        return { text, url, ...options }
    }
    static game(text, options = {
            hide: false,
    }) {
        return { text, callback_game: {}, ...options }
    }
    static pay(text, options = {
            hide: false,
    }) {
        return { text, pay: true, ...options }
    }
    static contact(text, options = {
            hide: false,
    }) {
        return { text, request_contact: true, ...options }
    }
    static location(text, options = {
            hide: false,
    }) {
        return { text, request_location: true, ...options }
    }
    static poll(text, type, options = {
            hide: false,
    }) {
        return { text, request_poll: { type }, ...options }
    }
    static user(text, options = {
            hide: false,
    }) {
        return { text, request_user: options, ...options }
    }
    static chat(text, options = {
            hide: false,
    }) {
        return { text, request_chat: options, ...options }
    }
    static login(text, url, options = {
            hide: false,
    }) {
        return { text, login_url: { ...options, url }, ...options }
    }
    static switchToChat(text, switchInlineQuery, options = {
            hide: false,
    }) {
        return { text, switch_inline_query: switchInlineQuery, ...options }
    }
    static switchToCurrentChat(text, switchInlineQueryCurrentChat, options = {
            hide: false,
    }) {
        return { text, switch_inline_query_current_chat: switchInlineQueryCurrentChat, ...options }
    }
    static webApp(text, url, options = {
            hide: false,
    }) {
        return { text, web_app: { url }, ...options }
    }
}

module.exports = Key
