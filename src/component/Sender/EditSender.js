import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { beautifulToKebabCase, isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import DropList from "../../layout/Shared/DropList"
import "../../assets/style/layout/list.css"

const EditSender = ({ sender }) => {

    const { updateSender, getSenderConnections, updateSenderConnection, listClients } = useCoreApi()

    const [client, setClient] = useState([])
    const [currentSender, setCurrentSender] = useState([])
    const [selectedUserID, setSelectedUserID] = useState(sender.user_id)
    const [currentSenderConnections, setCurrentSenderConnections] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(sender.client.company_name);

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)
        setCurrentSender(sender)

        const sndcon = await getSenderConnections(sender.id)
        if (sndcon) setCurrentSenderConnections(sndcon)
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

    const operatorApprovementChanged = (checked, operatorName) => {
        const conn = currentSenderConnections.filter(conn => conn.smsc.operator.name === operatorName)
        conn.forEach( async conn => {
            let newConn = await updateSenderConnection(conn.id, { approved: checked })
            if (! isEmpty(newConn)) {
                showAlert("Sender operator approvement updated successfully");
            }
        })
    }


    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Sender Information</h1>
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
                        <td>{ typeof currentSender["name"] === "boolean"? currentSender["name"] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentSender["name"] ?? "NULL"}</td>
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

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificSender()}>Update Sender</button>
            </div>

            <h1 className="content-header mb-5 mt-5">Sender Operators</h1>
            {isEmpty(currentSenderConnections) ?
            <div className="no-data">The sender has no operators</div> :
            [...new Set(currentSenderConnections.map(conn => conn.smsc.operator.name))].map(currentSenderOperator => (
                <div className="list-container">
                    <div className="master-list-item-container">
                        <div className="master-list-item">
                            <div className="d-flex align-items-center justify-content-between">
                                { currentSenderOperator }
                                <div className="d-flex flex-column align-items-center pt-2">
                                    <h6><span>Not Approved</span><span>Is Approved</span></h6>
                                    <input 
                                        className="smsc-approved checkbox d-none" 
                                        id={"connection-approved-" + beautifulToKebabCase(currentSenderOperator)} 
                                        type="checkbox" 
                                        defaultChecked={currentSenderConnections.find(conn => conn.smsc.operator.name === currentSenderOperator).approved}
                                        onChange={(e) => operatorApprovementChanged(e.currentTarget.checked, currentSenderOperator)}
                                    />
                                    <label for={"connection-approved-" + beautifulToKebabCase(currentSenderOperator)}></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EditSender