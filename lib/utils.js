const Key = require('./key')

const chunk = (arr, len) => {
    const chunks = []

    while (arr.length > 0) {
        chunks.push(arr.splice(0, len))
    }

    return chunks
}

const convertTextToCallbackButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'string') {
            return Key.callback(button)
        }

        return button
    }))
}

module.exports = {
    chunk,
    convertTextToCallbackButtons,
}
