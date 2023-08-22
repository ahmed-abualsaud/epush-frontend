import { isEmpty } from "../../utils/helper"
import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import DropList from "../../layout/Shared/DropList"

const AddSenderConnection = () => {

    const { addSenderConnection, listClients, getClientSenders, listSMSCBindings } = useCoreApi()

    const [client, setClient] = useState([])
    const [smscBindings, setSMSCBindings] = useState([])
    const [operatorSMSC, setOperatorSMSC] = useState([])
    const [clientSenders, setClientSenders] = useState([])
    const [selectedSenderID, setSelectedSenderID] = useState(0)
    const [countryOperators, setCountryOperators] = useState([])
    const [selectedConnection, setSelectedConnection] = useState({})
    const [selectedSMSCVAlue, setSelectedSMSCVAlue] = useState("Not Selected")
    const [selectedCountryCode, setSelectedCountryCode] = useState("Not Selected")
    const [selectedOperatorCode, setSelectedOperatorCode] = useState("Not Selected")

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
        const senderconnection = {
            sender_id: selectedSenderID + "",
            smsc_id: selectedConnection.id + "",
            approved: getElement("add-sender-connection-approved")?.checked
        }

        if (isEmpty(senderconnection)) {
            showAlert("Valid Sender Connection Information Required")
            return
        }

        const result = await addSenderConnection(senderconnection);
        if (! isEmpty(result)) {
            navigate("content", "list-senders-connections")
            showAlert("Sender Connection Added Successfully!")
        }
    }

    const onSelectClient = async (option) => {
        setClientSenders(await getClientSenders(client.find(o => o.company_name === option).user_id))
        getElement("client-sender-droplist").classList.remove("d-none")
    }

    const onSelectClientSender = (option) => {
        setSelectedSenderID(clientSenders.find(o => o.name === option).id)
    }

    const onSelectCountry = async (option) => {
        const selectedCountry = smscBindings.filter(o => o.country.name === option)
        setCountryOperators(selectedCountry)
        setSelectedCountryCode(selectedCountry[0].country.code)
        getElement("country-operators-droplist").classList.remove("d-none")
    }

    const onSelectOperator = async (option) => {
        const selectedOperator = countryOperators.filter(o => o.operator.name === option)
        setOperatorSMSC(selectedOperator)
        setSelectedOperatorCode(selectedOperator[0].operator.code)
        getElement("operator-smsc-droplist").classList.remove("d-none")
    }

    const onSelectSMSC = (option) => {
        const selectedSMSC = operatorSMSC.find(o => o.smsc.name === option)
        setSelectedConnection(selectedSMSC)
        setSelectedSMSCVAlue(selectedSMSC.smsc.value)
    }



    return (
        <div id="add-sender-connection-form" className="add-user-container">
            <h1 className="add-user-header mb-5">
                Add New Sender Connection
                <button style={{marginLeft: "auto", backgroundColor: "#070020", backgroundImage: "none"}} className="button" onClick={() => navigate("content", "add-sender")}>Add New Sender</button>
            </h1>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div id="client-sender-droplist" className="d-none">
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Sender Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Sender Name" options={isEmpty(clientSenders)? ["The selected client doesn't has any senders"] : clientSenders.map(item => item.name)} onSelect={onSelectClientSender}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Country</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName="Select Country" options={[...new Set(smscBindings.map(item => item.country.name))]} onSelect={onSelectCountry}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>Country Code = {selectedCountryCode}</div>
            </div>

            <div id="country-operators-droplist" className="d-none">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Operator</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName="Select Operator" options={[...new Set(countryOperators.map(item => item.operator.name))]} onSelect={onSelectOperator}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>Operator Code = {selectedOperatorCode}</div>
            </div>

            <div id="operator-smsc-droplist" className="d-none">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>SMS Connection</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName="Select SMS Connection" options={[...new Set(operatorSMSC.map(item => item.smsc.name))]} onSelect={onSelectSMSC}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>SMSC Value = {selectedSMSCVAlue}</div>
            </div>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Not Approved</span><span>Is Approved</span></h6>
                <input id="add-sender-connection-approved" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-sender-connection-approved"></label>
            </div>

            <div className="update-user">
                <button className="button" onClick={() => addNewSenderConnection()}>Add New Sender Connection</button>
            </div>
        </div>
    )
}

export default AddSenderConnection