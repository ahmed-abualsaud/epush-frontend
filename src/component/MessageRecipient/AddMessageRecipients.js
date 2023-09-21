import { useEffect, useRef } from "react"
import "../../assets/style/component/add-message-recipients.css"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const AddMessageRecipients = ({ setRecipients, addMessageSegmentsRenderFunction }) => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("add-recipients", "extendable-form-addition", setRecipients)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderExtendableForm = () => {
        render("add-recipients", "extendable-form-addition", setRecipients)
    }

    const renderTextArea = () => {
        render("add-recipients", "text-area-addition", setRecipients)
    }

    const renderFromFile = () => {
        render("add-recipients", "from-file-addition", setRecipients)
    }

    const importedFromParametersFile = () => {
        addMessageSegmentsRenderFunction()
    }

    return (
        <div className="mt-5">
            <div className="message-recipients-question">How would you like to add the numbers of message recipients?</div>

            <NavBar>
                <div onClick={renderExtendableForm}><i className="fas fa-diagram-next"></i>Extendable Form</div>
                <div onClick={renderTextArea}><i className="far fa-rectangle-list"></i>Text Area</div>
                <div onClick={renderFromFile}><i className="far fa-file-lines"></i>From File</div>
                <div onClick={importedFromParametersFile}><i className="fas fa-file-import"></i>Imported From Parameters File</div>
            </NavBar>

            <div id="add-recipients"></div>
        </div>
    )
}

export default AddMessageRecipients