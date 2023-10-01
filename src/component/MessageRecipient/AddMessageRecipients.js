import { useEffect, useRef } from "react"
import "../../assets/style/component/add-message-recipients.css"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const AddMessageRecipients = ({ setGroupRecipients, addMessageSegmentsRenderFunction }) => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("add-recipients", "extendable-form-addition", setGroupRecipients)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderExtendableForm = () => {
        render("add-recipients", "extendable-form-addition", setGroupRecipients)
    }

    const renderTextArea = () => {
        render("add-recipients", "text-area-addition", setGroupRecipients)
    }

    const renderFromFile = () => {
        render("add-recipients", "from-file-addition", setGroupRecipients)
    }

    const renderOldRecipientsGroup = () => {
        render("add-recipients", "recipients-group-addition", setGroupRecipients)
    }

    const importedFromParametersFile = () => {
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