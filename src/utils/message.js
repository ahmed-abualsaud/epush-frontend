import { parseExcelFile, parseTextFile, parseWordFile } from "./file"
import { arraysAreEqual, isEmpty } from "./helper"
import { showAlert } from "./validator"

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
    
    if (! arraysAreEqual(keys, msgKeys)) {
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