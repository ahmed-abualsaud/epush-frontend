import { isNull } from "./helper"

export function createElement(tagName, options = {}) {

    let element = document.createElement(tagName)

    if (!isNull(options.attributes)) {

        options.attributes.forEach(attribute => {
            element.setAttribute(attribute.name, attribute.value)
        })
    }

    if (!isNull(options.eventListeners)) {

        options.eventListeners.forEach(eventListener => {
            element.addEventListener(eventListener.name, eventListener.callback)
        })
    }

    if (!isNull(options.text)) {

        element.appendChild(createText(options.text))
    }

    return element
}

export function getElement(elementID) {

    return document.getElementById(elementID)
}

export function createText(text) {

    return document.createTextNode(text)
}

export function removeElement(elementID) {

    let element = document.getElementById(elementID)
    if (!isNull(element)) element.remove()
}

export function getElementsWithAttribute(elementID, attribute) {

    return document.getElementById(elementID).querySelectorAll(`[${attribute}]`)
}

export function getFormInputData(elementID) {

    const validationElements = getElementsWithAttribute(elementID, "validrules")

    let data = {}

    validationElements.forEach(element => {
        data[element.name] = element.value
    })

    return data
}

export function fadeElementOut(element) {

    let oldClass = element.getAttribute("class")
    let newClass = isNull(oldClass)? "fade-out" : `${oldClass} fade-out`

    const interval1 = setInterval(() => {
        element.setAttribute("class", newClass)
        clearInterval(interval1)
    }, 2000)

    const interval2 = setInterval(() => {
        removeElement(element.getAttribute("id"))
        clearInterval(interval2)
    }, 3000)
}