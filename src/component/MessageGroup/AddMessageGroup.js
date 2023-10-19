import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import { navigate, render } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import { useEffect, useRef, useState } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import DropList from "../../layout/Shared/DropList"

const AddMessageGroup = () => {

    const [client, setClient] = useState([])
    const [selectedClient, setSelectedClient] = useState({})
    const [groupRecipients, setGroupRecipients] = useState({})

    const { listClients, addMessageGroup } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        render("add-group-recipients-numbers", "extendable-form-addition", setGroupRecipients)
        render("add-group-recipients-numbers-and-attributes", "import-recipients-data", setGroupRecipients)
        getElement("group-recipients-numbers-and-attributes").classList.add("d-none")

        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewMessageGroup = async () => {

        if (validate("add-message-group-form")) {


            if (isEmpty(selectedClient)) {
                showAlert("Please Select a Company")
                return
            }

            if (isEmpty(groupRecipients[0]?.recipients)) {
                showAlert("Please type the recipients data")
                return
            }


            const messageGroup = {
                name: getElement("add-message-group-name")?.value,
                user_id: selectedClient.user_id,
                recipients: groupRecipients[0].recipients
            }

            const result = await addMessageGroup(messageGroup);
            if (! isEmpty(result)) {
                navigate("content", "list-message-groups")
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

    const onSelectClient = async (option) => {
        setSelectedClient(client.find(c => c.company_name === option))
    }

    return (
        <div id="add-message-group-form" className="component-container">
            <h1 className="content-header mb-5">Add New Message Group</h1>

            <Input id="add-message-group-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="mt-5">
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

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
        </div>
    )
}

export default AddMessageGroup