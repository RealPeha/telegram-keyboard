const Key = require('./key')

const chunk = (arr, len) => {
    if (!arr.length) {
        return [arr]
    }

    const chunks = []

    while (arr.length > 0) {
        chunks.push(arr.splice(0, len))
    }

    return chunks
}

const formatInlineButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'string' || typeof button === 'number') {
            const text = '' + button;

            return { text, callback_data: text };
        }

        if (button.type === 'text') {
            const text = '' + button.text;

            return { text, callback_data: text };
        }

        const { hide, ...restButton } = button
            
        return restButton
    }))
}

const formatBuiltInButtons = (buttons) => {
    return buttons.map(row => row.map(button => {
        if (typeof button === 'number') {
            return '' + button
        }

        if (typeof button === 'object') {
            return '' + button.text
        }

        return button
    }))
}

module.exports = {
    chunk,
    formatInlineButtons,
    formatBuiltInButtons,
}
