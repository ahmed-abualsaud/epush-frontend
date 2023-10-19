import { isEmpty } from "../../utils/helper"
import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import { useEffect, useRef, useState } from "react"
import DropList from "../../layout/Shared/DropList"

const AddSender = () => {

    const { addSender, listClients } = useCoreApi()

    const [client, setClient] = useState([])
    const [selectedUserID, setSelectedUserID] = useState(0)

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewSender = async () => {
        const sender = {
            name: getElement("add-sender-name")?.value,
            user_id: selectedUserID + "",
            approved: getElement("add-sender-approved")?.checked
        }

        if (isEmpty(sender)) {
            showAlert("Valid Sender Information Required")
            return
        }

        const result = await addSender(sender);
        if (! isEmpty(result)) {
            navigate("content", "list-senders")
            showAlert("Sender Added Successfully!")
        }
    }

    const onSelectClient = async (option) => {
        setSelectedUserID(client.find(c => c.company_name === option).user_id)
    }

    const senderNameOnInputHandler = (e) => {
        const englishRegex = /^[A-Za-z0-9\s!@#$%^&*()-_=+[\]{};:'"<>/?.,|`~]*$/;
        if (!englishRegex.test(e.currentTarget.value)) {
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }
    }



    return (
        <div id="add-sender-form" className="component-container">
            <h1 className="content-header mb-5">Add New Sender</h1>

            <div className="mb-3">Note: the maximum sender name length is 11 characters and it should be in english</div>
            <Input id="add-sender-name" type="text" placeholder="Name" validrules="required" maxLength={11} onInput={senderNameOnInputHandler}>
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Not Approved</span><span>Is Approved</span></h6>
                <input id="add-sender-approved" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-sender-approved"></label>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewSender()}>Add New Sender</button>
            </div>
        </div>
    )
}

export default AddSender