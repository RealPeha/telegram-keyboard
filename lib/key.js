const Key = {
    text(text, hide = false) {
        return { text, type: 'text', hide }
    },

    callback(text, callbackData, hide = false) {
        return { text, callback_data: callbackData || text, hide }
    },

    url(text, url, hide = false) {
        return { text, url, hide }
    },

    game(text, hide = false) {
        return { text, callback_game: {}, hide }
    },

    pay(text, hide = false) {
        return { text, pay: true, hide }
    },

    contact(text, hide = false) {
        return { text, request_contact: true, hide }
    },

    location(text, hide = false) {
        return { text, request_location: true, hide }
    },

    poll(text, type, hide = false) {
        return { text, request_poll: { type }, hide }
    },

    login(text, url, options = {}, hide = false) {
        return { text, login_url: { ...options, url }, hide }
    },
}

module.exports = Key
