import { isEmpty } from "./helper"
import { showAlert } from "./validator"
import { parseExcelFile, parseTextFile, parseWordFile } from "./file"


export const convertToMessageAttributes = (keys, values) => {
    return JSON.stringify(keys.map((key, i) => ({name: key, value: values[i]})))
}

export const getMessageTemplateKeys = (template) => {
    const regex = /{{([^{}]+)}}/g
    const matches = template.match(regex)
    if (!matches) {
        return []
    }
    const values = matches.map(match => match.replace(/{{|}}/g, '').toLowerCase().trim())
    return values
}

export const generateMessages = (keys, values, template) => {
    const messages = []
    for (const valueSet of values) {
        let message = template
        let attributes = null

        if (isEmpty(valueSet)) {
            messages.push({message: message, attributes: attributes})
            continue
        }

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = valueSet[i]
            const regex = new RegExp(`{{${key}}}`, 'g')
            message = message.replace(regex, value)
        }
        messages.push({message: message, attributes: convertToMessageAttributes(keys, valueSet)})
    }
    return messages
}

export const generateMessagesFromFileData = (template, data) => {
    let keys = data[0].split(/,\s*/).map(key => key.toLowerCase())
    let msgKeys = getMessageTemplateKeys(template)
    
    if (! [...msgKeys, "phone"].every(element => keys.includes(element))) {
        showAlert("Message parameter names and uploaded parameter names are not equal")
        return []
    }

    let values = []
    let numbers = []
    let row = []
    for (let i = 1; i < data.length; i++) {
        row = data[i].split(/,\s*/)
        values.push(row)
        numbers.push(row[keys.indexOf("phone")])
    }

    let messages = generateMessages(keys, values, template)
    let result = []

    for (let i = 0; i < messages.length; i++) {
        result.push ({title: numbers[i], content: messages[i]})
    }

    return result
}

export const generateMessagesFromRecipients = (template, recipients) => {
    let keys = getMessageTemplateKeys(template)

    let result = []
    let attributes = []

    recipients.forEach(recipient => {
        let attribute = {}
        let message = template

        attributes = JSON.parse(typeof recipient.attributes === "string" ? recipient.attributes : "[]").map(attr => ({ [attr.name]: attr.value }))
        attributes.push({phone: recipient.number})
        keys.forEach(key => {
            attribute = attributes.find(attribute => attribute.hasOwnProperty(key))
            message = message.replace("{{" + key + "}}", attribute? attribute[key] : "unknown")
        })
        result.push({title: recipient.number, content: message})
    })

    return result
}

export const generateMessagesUsingExcelFileParameters = (template, excelContent) => {
    return generateMessagesFromFileData(template, parseExcelFile(excelContent))
}

export const generateMessagesUsingWordFileParameters = (template, wordContent) => {
    return generateMessagesFromFileData(template, parseWordFile(wordContent))
}

export const generateMessagesUsingTextFileParameters = (template, textContent) => {
    return generateMessagesFromFileData(template, parseTextFile(textContent))
}

export const messageLanguageFilter = (e, characters, languageName) => {
    const keyCode = e.keyCode || e.which
    const keyValue = e.key

    const isValid =
        keyCode === 8 || // Backspace key
        keyCode === 9 || // Tap key
        keyCode === 13 || // Enter key
        keyCode === 16 || // Shift key
        keyCode === 17 || // Control key
        keyCode === 18 || // Alt key
        keyCode === 20 || // Caps Lock key
        keyCode === 32 || // Space key
        keyCode === 37 || // Arrow Left key
        keyCode === 38 || // Arrow Up key
        keyCode === 39 || // Arrow Right key
        keyCode === 40 || // Arrow Down key
        (e.ctrlKey && (keyCode === 97 || keyCode === 65)) || // Ctrl+A (97 for regular A, 65 for numpad A)
        (e.ctrlKey && (keyCode === 118 || keyCode === 86)) || // Ctrl+V (118 for regular V, 86 for numpad V)
        (e.ctrlKey && keyCode === 90) || // Ctrl+Z
        (e.ctrlKey && keyCode === 88) || // Ctrl+X
        (e.ctrlKey && keyCode === 67) || // Ctrl+C
        characters.includes(keyValue)

    if (!isValid) {
      e.preventDefault()
      showAlert("The selected language " + languageName + " does not have the entered character " + keyValue)
    }
}