import useAuthApi from '../api/useAuthApi'
import '../assets/style/component/generate-password-modal.css'

import { getElement } from "../utils/dom"
import { useEffect, useRef } from 'react'
import { showAlert } from "../utils/validator"

const GeneratePasswordModal = ({ userID }) => 
{
    const { generatePassword } = useAuthApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const newPassword = await generatePassword(userID)
        getElement("password-input").value = newPassword
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    function copyToClipboard() {
        navigator.clipboard.writeText(getElement('password-input').value)
        .then(() => {
            showAlert('Password copied to clipboard')
        })
        .catch(err => {
            showAlert('Error copying Password to clipboard')
        })
    }

    return (
        <div className="generate-password-modal">
            <div>Please copy the generated password because by closing this form you will lose the generated password!</div>
            <input type="text" id="password-input" />
            <button className="button" onClick={() => copyToClipboard()}>Copy to Clipboard<i className="uil uil-copy"></i></button>
        </div>
    )
}

export default GeneratePasswordModal