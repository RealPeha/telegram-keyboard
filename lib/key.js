class Key {
    static text(text, hide = false) {
        return { text, type: 'text', hide }
    }
    static callback(text, callbackData, hide = false) {
        return { text, callback_data: callbackData || text, hide }
    }
    static url(text, url, hide = false) {
        return { text, url, hide }
    }
    static game(text, hide = false) {
        return { text, callback_game: {}, hide }
    }
    static pay(text, hide = false) {
        return { text, pay: true, hide }
    }
    static contact(text, hide = false) {
        return { text, request_contact: true, hide }
    }
    static location(text, hide = false) {
        return { text, request_location: true, hide }
    }
    static poll(text, type, hide = false) {
        return { text, request_poll: { type }, hide }
    }
    static login(text, url, options = {}, hide = false) {
        return { text, login_url: { ...options, url }, hide }
    }
    static switchToChat(text, switchInlineQuery, hide = false) {
        return { text, switch_inline_query: switchInlineQuery, hide }
    }
    static switchToCurrentChat(text, switchInlineQueryCurrentChat, hide = false) {
        return { text, switch_inline_query_current_chat: switchInlineQueryCurrentChat, hide }
    }
    static webApp(text, url, hide = false) {
        return { text, web_app: { url }, hide }
    }
}

module.exports = Key
