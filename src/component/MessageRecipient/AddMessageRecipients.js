import { useEffect, useRef, useState } from "react"
import "../../assets/style/component/add-message-recipients.css"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const AddMessageRecipients = ({ userID, setGroupRecipients, addMessageSegmentsRenderFunction }) => {

    const [renderOldRecipients, setRenderOldRecipients] = useState(false)

    const setupLock = useRef(true)
    const setup = async () => {
        render("add-recipients", "extendable-form-addition", setGroupRecipients)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        renderOldRecipients && render("add-recipients", "recipients-group-addition", userID, setGroupRecipients)
    }, [userID])

    const renderExtendableForm = () => {
        setRenderOldRecipients(false)
        render("add-recipients", "extendable-form-addition", setGroupRecipients)
    }

    const renderTextArea = () => {
        setRenderOldRecipients(false)
        render("add-recipients", "text-area-addition", setGroupRecipients)
    }

    const renderFromFile = () => {
        setRenderOldRecipients(false)
        render("add-recipients", "from-file-addition", setGroupRecipients)
    }

    const renderOldRecipientsGroup = () => {
        setRenderOldRecipients(true)
        render("add-recipients", "recipients-group-addition", userID, setGroupRecipients)
    }

    const importedFromParametersFile = () => {
        setRenderOldRecipients(false)
        addMessageSegmentsRenderFunction()
    }

    return (
        <div className="mt-5">
            <div className="message-recipients-question">How would you like to add the message recipients?</div>

            <NavBar>
                <div onClick={renderExtendableForm}><i className="fas fa-diagram-next"></i>Extendable Form</div>
                <div onClick={renderTextArea}><i className="far fa-rectangle-list"></i>Text Area</div>
                <div onClick={renderFromFile}><i className="far fa-file-lines"></i>From File</div>
                <div onClick={renderOldRecipientsGroup}><i className="fas fa-users"></i>Old Recipients Group</div>
                <div onClick={importedFromParametersFile}><i className="fas fa-file-import"></i>Imported From Parameters File</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="add-recipients"></div>
        </div>
    )
}

export default AddMessageRecipients