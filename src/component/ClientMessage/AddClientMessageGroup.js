import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import { navigate, render } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import { useEffect, useRef, useState } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { useSelector } from "react-redux"
import Page from "../../page/Page"

const AddClientMessageGroup = () => {

    const [groupRecipients, setGroupRecipients] = useState({})

    const { addMessageGroup } = useCoreApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        render("add-group-recipients-numbers", "extendable-form-addition", setGroupRecipients)
        render("add-group-recipients-numbers-and-attributes", "import-recipients-data", setGroupRecipients)
        getElement("group-recipients-numbers-and-attributes").classList.add("d-none")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewMessageGroup = async () => {

        if (validate("add-message-group-form")) {

            if (isEmpty(groupRecipients[0]?.recipients)) {
                showAlert("Please type the recipients data")
                return
            }


            const messageGroup = {
                name: getElement("add-message-group-name")?.value,
                user_id: user?.user?.id,
                recipients: groupRecipients[0].recipients
            }

            const result = await addMessageGroup(messageGroup);
            if (! isEmpty(result)) {
                navigate("content", "list-client-message-groups")
                showAlert("Message Group Added Successfully!")
            } else {
                showAlert("Valid Message Group Information Required")
            }
        }
    }

    const renderExtendableForm = () => {
        render("add-group-recipients-numbers", "extendable-form-addition", setGroupRecipients)
    }

    const renderTextArea = () => {
        render("add-group-recipients-numbers", "text-area-addition", setGroupRecipients)
    }

    const renderFromFile = () => {
        render("add-group-recipients-numbers", "from-file-addition", setGroupRecipients)
    }

    const renderImportNumbersAndAttributesFromFile = () => {
        render("add-group-recipients-numbers-and-attributes", "import-recipients-data", setGroupRecipients)
    }

    const addNumbersOnly = () => {
        getElement("group-recipients-numbers").classList.remove("d-none")
        getElement("group-recipients-numbers-and-attributes").classList.add("d-none")
    }

    const addNumbersAndAttributes = () => {
        getElement("group-recipients-numbers").classList.add("d-none")
        getElement("group-recipients-numbers-and-attributes").classList.remove("d-none")
    }

    return (
        <Page title="Add New Message Group">
            <Input id="add-message-group-name" icon="fas fa-pen" type="text" placeholder="Group Name" validrules="required"/>

            <div className="mt-5">
                <div className="message-recipients-question">How would you like to add the message recipients?</div>

                <NavBar>
                    <div onClick={addNumbersOnly}><i className="fas fa-list-ol"></i>Add Numbers Only</div>
                    <div onClick={addNumbersAndAttributes}><i className="fas fa-pen-clip"></i>Add Numbers & Custom Attributes</div>
                </NavBar>

                <div id="group-recipients-numbers">
                    <NavBar>
                        <div onClick={renderExtendableForm}><i className="fas fa-diagram-next"></i>Extendable Form</div>
                        <div onClick={renderTextArea}><i className="far fa-rectangle-list"></i>Text Area</div>
                        <div onClick={renderFromFile}><i className="far fa-file-lines"></i>From File</div>
                    </NavBar>

                    <div style={{marginTop: "25px"}} id="add-group-recipients-numbers"></div>

                </div>

                <div id="group-recipients-numbers-and-attributes">
                    <NavBar>
                        <div onClick={renderImportNumbersAndAttributesFromFile}><i className="fas fa-file-import"></i>Import Form File</div>
                    </NavBar>

                    <div style={{marginTop: "25px"}} id="add-group-recipients-numbers-and-attributes"></div>

                </div>

            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewMessageGroup()}>Add New Message Group</button>
            </div>
        </Page>
    )
}

export default AddClientMessageGroup