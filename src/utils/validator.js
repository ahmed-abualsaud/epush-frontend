import { isEmpty, arrayMergeUnique, arrayIsEmpty } from "../utils/helper"
import { getElement, createElement, removeElement, fadeElementOut, getElementsWithAttribute } from "../utils/dom"
import { randomString } from "./strUtils"

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
            if (isEmpty(value)) addErrorMessage("Please, submit required data", errorMessages) 
        }

        if(rule === "number") {
            if (isNaN(value)) addErrorMessage("Please, provide the data of indicated type", errorMessages) 
        }

        if(rule.includes("in[")) {
            const inValues = rule.substring(3, rule.length - 1).split(",")
            if (!inValues.includes(value)) addErrorMessage("Please, submit required data", errorMessages) 
        }

        if(rule === "phone") {
            if (! /^\d{10,16}$/.test(value)) addErrorMessage("Please, enter a valid phone number (between 10 and 16 digits)", errorMessages) 
        }

        if(rule === "strong_password") {
            if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(value)) addErrorMessage("Please, enter a strong password", errorMessages) 
        }
    })

    return errorMessages
}

function validatFormInputs(formID) {

    let errorMessages = []

    const validationElements = getElementsWithAttribute(formID, "validrules")

    validationElements?.forEach(element => {
        errorMessages = arrayMergeUnique(errorMessages, validateElementValue(element.value, element.getAttribute("validrules").split("|")))
    })

    return errorMessages
}

function addToasts(contents) {

    let toastID = null
    let toastElement = null
    let toastContainer = getElement("toast") ?? createElement('div', {

        add: true,
        attributes: [
            {
                name: "id",
                value: "toast"
            },
            {
                name: "style",
                value: "position:fixed;top:5px;left:50%;transform:translateX(-50%);z-index:1000000;"
            },
            
        ]
    })

    contents.forEach(content => {

        toastID = randomString(10)
    
        toastElement = createElement("div")
        toastElement.setAttribute("id", toastID)
        toastElement.setAttribute("style", "z-index:1000000;background-image: url(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg\"), linear-gradient(43deg, #070020 -100%, #063F30 30%, #BFE85F 150%);border:1px solid #fff")
        toastElement.setAttribute("class", "alert d-flex text-white justify-content-between")
        
        toastElement.appendChild(createElement("p", {
            children: content,
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

export function showAlert(...messages) {
    addToasts(messages)
}

export function validate(formID) {

    let errorMessages = validatFormInputs(formID)
    if (arrayIsEmpty(errorMessages)) {
        return true
    }
    addToasts(errorMessages)
    return false
}