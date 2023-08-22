import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import DropList from "../../layout/Shared/DropList"

const EditSender = ({ sender }) => {

    const { updateSender, listClients } = useCoreApi()

    const [client, setClient] = useState([])
    const [currentSender, setCurrentSender] = useState([])
    const [selectedUserID, setSelectedUserID] = useState(sender.user_id)
    const [selectedCompany, setSelectedCompany] = useState(sender.client.company_name);

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)
        setCurrentSender(sender)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificSender = async () => {
        let data = {
            user_id: selectedUserID + "",
            approved: getElement("edit-sender-approved")?.checked
        }

        const senderName = getElement("sender-name-input")?.value
        if (! isEmpty(senderName)) {
            data.name = senderName
        }

        if (! isEmpty(data)) {
            let newSender = await updateSender(currentSender.id, data)
            if (! isEmpty(newSender)) {
                setCurrentSender(newSender)
                showAlert("Sender information updated successfully");
            }
        }
    }

    const onSelectClient = (option) => {
        const selectedClient = client.find(c => c.company_name === option);
        if (selectedClient) {
            setSelectedUserID(selectedClient.user_id);
            setSelectedCompany(selectedClient.company_name);
        }
    }


    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Sender Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                    <th>Attribute Name</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>{ typeof currentSender["name"] === "boolean"? currentSender["name"] ? "Yes" : "No" : currentSender["name"] ?? "NULL"}</td>
                        <td className="info-input"> {
                            <input id={"sender-name-input"} placeholder={ "Type the new " + snakeToBeautifulCase("name") + " here"} type="text"/>
                        }</td>
                    </tr>
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName={selectedCompany} options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Not Approved</span><span>Is Approved</span></h6>
                <input id="edit-sender-approved" className="checkbox d-none" type="checkbox" defaultChecked={currentSender["approved"]}/>
                <label for="edit-sender-approved"></label>
            </div>

            <div className="update-role">
                <button className="button" onClick={() => updateSpecificSender()}>Update Sender</button>
            </div>
        </div>
    )
}

export default EditSender