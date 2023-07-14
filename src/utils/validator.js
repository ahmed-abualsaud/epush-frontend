import { isNull, randomString, arrayMergeUnique, arrayIsEmpty } from "../utils/helper"
import { getElement, createElement, removeElement, fadeElementOut, getElementsWithAttribute } from "../utils/dom"

function addErrorMessage(errorMessage, errorMessages) {

    if (!errorMessages.includes(errorMessage)) {
        errorMessages.push(errorMessage)
    }
}

function validateElementValue(value, rules) {

    let errorMessages = []

    rules.forEach(rule => {

        rule = rule.trim()

        if(rule === "required") {
            if (isNull(value)) addErrorMessage("Please, submit required data", errorMessages) 
        }

        if(rule === "number") {
            if (isNaN(value)) addErrorMessage("Please, provide the data of indicated type", errorMessages) 
        }

        if(rule.includes("in[")) {
            const inValues = rule.substring(3, rule.length - 1).split(",")
            if (!inValues.includes(value)) addErrorMessage("Please, submit required data", errorMessages) 
        }

        if(rule === "strong_password") {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(value)) addErrorMessage("Please, choose a strong password", errorMessages) 
        }
    })

    return errorMessages
}

function validatFormInputs(formID) {

    let errorMessages = []

    const validationElements = getElementsWithAttribute(formID, "validrules")

    validationElements.forEach(element => {
        errorMessages = arrayMergeUnique(errorMessages, validateElementValue(element.value, element.getAttribute("validrules").split("|")))
    })

    return errorMessages
}

function addToasts(toastContainerID, contents) {

    let toastID = null
    let toastElement = null
    let toastContainer = getElement(toastContainerID)

    contents.forEach(content => {

        toastID = randomString(10)
    
        toastElement = createElement("div")
        toastElement.setAttribute("id", toastID)
        toastElement.setAttribute("style", "border-bottom-left-radius:55px;border-top-left-radius:0;z-index:1000;background-image: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg\"), linear-gradient(43deg, #070020 0%, #063F30 50%, #BFE85F 200%);")
        toastElement.setAttribute("class", "alert d-flex text-white justify-content-between")
        toastContainer.style.display = "block"

        
        toastElement.appendChild(createElement("p", {
            text: content,
            attributes: [
                {
                    name: "class",
                    value: "m-0 mx-4"
                }
            ]
        }))

        
        toastElement.appendChild(createElement("button", {
            attributes: [
                {
                    name: "type",
                    value: "button"
                },
                {
                    name: "class",
                    value: "btn-close bg-white"  
                }
            ],
            eventListeners: [
                {
                    name: "click",
                    callback: () => removeElement(toastID)
                }
            ]
        }))

        toastContainer.appendChild(toastElement)

        fadeElementOut(toastElement)
    })
}

export function showValidationError(toastID, errorMessages) {

    addToasts(toastID, errorMessages)
}

export function alertError(message) {
    addToasts('toast', [message])
}

export function applyFormValidation(formID, toastID) {

    let errorMessages = validatFormInputs(formID)
    showValidationError(toastID, errorMessages)
    if (arrayIsEmpty(errorMessages)) {
        return true
    }
    return false
}

export function validate(formID) {

    let errorMessages = validatFormInputs(formID)
    showValidationError('toast', errorMessages)
    if (arrayIsEmpty(errorMessages)) {
        return true
    }
    return false
}