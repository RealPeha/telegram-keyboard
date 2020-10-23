const Key = require('./key')

const chunk = (arr, len) => {
    const chunks = []

    while (arr.length > 0) {
        chunks.push(arr.splice(0, len))
    }

    return chunks
}

const convertToCallbackButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'string' || typeof button === 'number') {
            return Key.callback('' + button)
        }

        return button
    }))
}

const convertNumberToStringButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'number') {
            return '' + button
        }

        return button
    }))
}

module.exports = {
    chunk,
    convertToCallbackButtons,
    convertNumberToStringButtons,
}
