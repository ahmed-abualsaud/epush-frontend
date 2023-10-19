import { beautifulToKebabCase, isEmpty } from "../../utils/helper"
import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import DropList from "../../layout/Shared/DropList"
import Input from "../../layout/Shared/Input"
import List from "../../layout/List/List"
import MasterListItem from "../../layout/List/MasterListItem"
import SlavesList from "../../layout/List/SlavesList"
import SlaveListItem from "../../layout/List/SlaveListItem"

const AddSenderAndSenderConnection = () => {

    const { addSender, addSenderConnection, listClients, listSMSCBindings } = useCoreApi()

    const [client, setClient] = useState([])
    const [smscBindings, setSMSCBindings] = useState([])
    const [selectedUserID, setSelectedUserID] = useState(0)
    const [countryOperators, setCountryOperators] = useState([])
    const [selectedConnections, setSelectedConnections] = useState([])
    const [selectedCountryCode, setSelectedCountryCode] = useState("Not Selected")

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

        const smcbid = await listSMSCBindings(1000000000000)
        if (smcbid?.data) setSMSCBindings(smcbid.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewSenderConnection = async () => {

        const sender = {
            name: getElement("add-sender-name")?.value,
            user_id: selectedUserID + "",
            approved: getElement("add-sender-approved")?.checked
        }

        if (isEmpty(sender)) {
            showAlert("Valid Sender Information Required")
            return
        }

        let result = await addSender(sender);
        if (! isEmpty(result)) {
            showAlert("Sender Added Successfully!")
        }

        if (isEmpty(selectedConnections)) {
            showAlert("Valid Sender Connection Information Required")
            return
        }

        let senderconnection = {}
        selectedConnections.forEach(async (connection) => {
            senderconnection = {
                sender_id: result.id + "",
                smsc_id: connection.id + "",
                approved: connection.approved
            }

            if (isEmpty(senderconnection)) {
                showAlert("Valid Sender Connection Information Required")
                return
            }

            result = await addSenderConnection(senderconnection);
            if (! isEmpty(result)) {
                showAlert("Sender Connection Added Successfully!")
            }
        })

        navigate("content", "list-senders")
    }

    const onSelectClient = async (option) => {
        setSelectedUserID(client.find(c => c.company_name === option).user_id)
    }

    const onSelectCountry = async (option) => {
        const selectedCountry = smscBindings.filter(o => o.country.name === option)
        setCountryOperators(selectedCountry)
        setSelectedCountryCode(selectedCountry[0].country.code)
        setSelectedConnections([])
    }

    const onSelectConnection = async (selected, item) => {
        const connectionID = item.querySelector(".connection-id").innerText
        const selectedConnection = countryOperators.find(countryOperator => countryOperator.id === parseInt(connectionID))

        selected?
        setSelectedConnections([...selectedConnections, {
            id: selectedConnection.id, 
            approved: getElement("connection-approved-" + beautifulToKebabCase(selectedConnection.operator.name) + "-" + beautifulToKebabCase(selectedConnection.country.name)).checked
        }]) :
        setSelectedConnections(selectedConnections.filter(sc => sc.id !== selectedConnection.id))
    }

    const senderNameOnInputHandler = (e) => {
        const englishRegex = /^[A-Za-z0-9\s!@#$%^&*()-_=+[\]{};:'"<>/?.,|`~]*$/;
        if (!englishRegex.test(e.currentTarget.value)) {
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }
    }

    const operatorApprovementChanged = (checked, operatorName) => {
        const connectionsID = countryOperators.filter(countryOperator => countryOperator.operator.name === operatorName).map(countryOperator => countryOperator.id)
        setSelectedConnections(selectedConnections.map(sc => {sc.approved = connectionsID.includes(sc.id) ? checked : sc.approved; return sc}))
    }



    return (
        <div id="add-sender-connection-form" className="component-container">
            <h1 className="content-header mb-5">
                Add New Sender Connection
                <button style={{marginLeft: "auto", backgroundColor: "#070020", backgroundImage: "none"}} className="button" onClick={() => navigate("content", "add-sender")}>Add New Sender</button>
            </h1>

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
                <h6><span>Sender Not Approved</span><span>Sender Is Approved</span></h6>
                <input id="add-sender-approved" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-sender-approved"></label>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Country</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName="Select Country" options={[...new Set(smscBindings.map(item => item.country.name))]} onSelect={onSelectCountry}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>Country Code = {selectedCountryCode}</div>
            </div>

            {[...new Set(countryOperators.map(item => item.operator.name))].map(countryOperator => (
                <List>
                    <MasterListItem>
                        <div className="d-flex align-items-center justify-content-between">
                            {countryOperator}
                            <div className="d-flex flex-column align-items-center pt-2">
                                <h6><span>Not Approved</span><span>Is Approved</span></h6>
                                <input 
                                    className="smsc-approved checkbox d-none" 
                                    id={"connection-approved-" + beautifulToKebabCase(countryOperator) + "-" + beautifulToKebabCase(countryOperators[0].country.name)} 
                                    type="checkbox" 
                                    defaultChecked={true}
                                    onChange={(e) => operatorApprovementChanged(e.currentTarget.checked, countryOperator)}
                                />
                                <label for={"connection-approved-" + beautifulToKebabCase(countryOperator) + "-" + beautifulToKebabCase(countryOperators[0].country.name)}></label>
                            </div>
                        </div>
                    </MasterListItem>
                    <SlavesList>
                        {countryOperators.filter(item => item.operator.name === countryOperator).map(connection => (
                            <SlaveListItem onSelectItem={onSelectConnection}>
                                <div className="connection-id d-none">{connection.id}</div>
                                <div>{connection.smsc.name}</div>
                            </SlaveListItem>
                        ))}
                    </SlavesList>
                </List>
            ))}

            <div className="button-container">
                <button className="button" onClick={() => addNewSenderConnection()}>Add New Sender Connection</button>
            </div>
        </div>
    )
}

export default AddSenderAndSenderConnection