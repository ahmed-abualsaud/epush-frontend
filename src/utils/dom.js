import { isEmpty } from "./helper"
import jsxToString from 'jsx-to-string'

export function createElement(tagName, options = {}) {

    let element = document.createElement(tagName)

    if (!isEmpty(options.attributes)) {

        options.attributes.forEach(attribute => {
            element.setAttribute(attribute.name, attribute.value)
        })
    }

    if (!isEmpty(options.eventListeners)) {

        options.eventListeners.forEach(eventListener => {
            element.addEventListener(eventListener.name, eventListener.callback)
        })
    }

    if (!isEmpty(options.children)) {

        if (typeof options.children === 'object') {
            element.innerHTML = jsxToString(options.children, {
                useFunctionCode: true
            })
        } 
        if (typeof options.children === 'string') {
            element.appendChild(createText(options.children))
        }
    }

    if (!isEmpty(options.add)) {

        document.body.appendChild(element)
    }

    return element
}

export function updateElement(jsx, elementID) {
    const elem = getElement(elementID)

    if (Array.isArray(jsx)) {
        elem.innerHTML = ""
        jsx.forEach((element) => {
            elem.innerHTML += jsxToString(element, {
                useFunctionCode: true
            })
        })
    } else {
        elem.innerHTML = jsxToString(jsx, {
            useFunctionCode: true
        })
    }
}

export function appendChildsToElement(jsx, elementID) {
    const elem = getElement(elementID)

    if (Array.isArray(jsx)) {
        jsx.forEach((element) => {
            elem.innerHTML += jsxToString(element, {
                useFunctionCode: true
            })
        })
    } else {
        elem.innerHTML += jsxToString(jsx, {
            useFunctionCode: true
        })
    }
}

export function getElement(elementID) {

    return document.getElementById(elementID)
}

export function createText(text) {

    return document.createTextNode(text)
}

export function removeElement(elementID) {

    let element = document.getElementById(elementID)

    if (! isEmpty(element)) { element.remove() }
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
    let newClass = isEmpty(oldClass)? "fade-out" : `${oldClass} fade-out`

    const interval1 = setInterval(() => {
        element.setAttribute("class", newClass)
        //(new Audio("../assets/audio/beep-sound.mp3")).play()
        clearInterval(interval1)
    }, 3000)

    const interval2 = setInterval(() => {
        removeElement(element.getAttribute("id"))
        clearInterval(interval2)
    }, 4000)
}

export function getFirstElementParent(tagName, element) {
    var parent = element.parentNode
    while (parent) {
      if (parent.tagName === tagName.toUpperCase()) {
        return parent
      }
      parent = parent.parentNode
    }
    return null
}