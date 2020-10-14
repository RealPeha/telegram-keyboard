const Key = {
    text(text) {
        return text
    },

    callback(text, callbackData) {
        return { text, callback_data: callbackData || text }
    },

    url(text, url) {
        return { text, url }
    },

    game(text) {
        return { text, callback_game: {} }
    },

    pay(text) {
        return { text, pay: true }
    },

    contact(text) {
        return { text, request_contact: true }
    },

    location(text) {
        return { text, request_location: true }
    },

    poll(text, type) {
        return { text, request_poll: { type } }
    },

    login(text, url, options = {}) {
        return { text, login_url: { ...options, url } }
    },
}

module.exports = Key
