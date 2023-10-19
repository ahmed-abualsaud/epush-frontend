import { isEmpty } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import DropList from "../../layout/Shared/DropList"

const EditSenderConnection = ({ senderConnection }) => {

    const { updateSenderConnection, listClients, getClientSenders, listSMSCBindings } = useCoreApi()

    const [client, setClient] = useState([])
    const [smscBindings, setSMSCBindings] = useState([])
    const [operatorSMSC, setOperatorSMSC] = useState([])
    const [clientSenders, setClientSenders] = useState([])
    const [countryOperators, setCountryOperators] = useState([])
    const [selectedSenderID, setSelectedSenderID] = useState(senderConnection.sender.id)
    const [selectedConnection, setSelectedConnection] = useState(senderConnection.smsc)
    const [selectedSMSCVAlue, setSelectedSMSCVAlue] = useState(senderConnection.smsc.smsc.value)
    const [selectedCountryCode, setSelectedCountryCode] = useState(senderConnection.smsc.country.code)
    const [selectedOperatorCode, setSelectedOperatorCode] = useState(senderConnection.smsc.operator.code)

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

        const smcbid = await listSMSCBindings(1000000000000)
        if (smcbid?.data) setSMSCBindings(smcbid.data)

        setClientSenders(await getClientSenders(clt.data.find(o => o.company_name === senderConnection.sender.client.company_name).user_id))
        const selectedCountry = smcbid.data.filter(o => o.country.name === senderConnection.smsc.country.name)
        setCountryOperators(selectedCountry)
        const selectedOperator = selectedCountry.filter(o => o.operator.name === senderConnection.smsc.operator.name)
        setOperatorSMSC(selectedOperator)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const editSenderConnection = async () => {
        const senderconnection = {
            sender_id: selectedSenderID + "",
            smsc_id: selectedConnection.id + "",
            approved: senderConnection.approved
        }

        if (isEmpty(senderconnection)) {
            showAlert("Valid Sender Connection Information Required")
            return
        }

        const result = await updateSenderConnection( senderConnection.id, senderconnection);
        if (! isEmpty(result)) {
            showAlert("Sender Connection Updated Successfully!")
        }
    }

    const onSelectClient = async (option) => {
        setClientSenders(await getClientSenders(client.find(o => o.company_name === option).user_id))
    }

    const onSelectClientSender = (option) => {
        setSelectedSenderID(clientSenders.find(o => o.name === option).id)
    }

    const onSelectCountry = async (option) => {
        const selectedCountry = smscBindings.filter(o => o.country.name === option)
        setCountryOperators(selectedCountry)
        setSelectedCountryCode(selectedCountry[0].country.code)
    }

    const onSelectOperator = async (option) => {
        const selectedOperator = countryOperators.filter(o => o.operator.name === option)
        setOperatorSMSC(selectedOperator)
        setSelectedOperatorCode(selectedOperator[0].operator.code)
    }

    const onSelectSMSC = (option) => {
        const selectedSMSC = operatorSMSC.find(o => o.smsc.name === option)
        setSelectedConnection(selectedSMSC)
        setSelectedSMSCVAlue(selectedSMSC.smsc.value)
    }



    return (
        <div id="edit-sender-connection-form" className="component-container">
            <h1 className="content-header mb-5">
                Edit Sender Connection
            </h1>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName={senderConnection.sender.client.company_name} options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Sender Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName={senderConnection.sender.name} options={isEmpty(clientSenders)? ["The selected client doesn't has any senders"] : clientSenders.map(item => item.name)} onSelect={onSelectClientSender}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Country</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName={senderConnection.smsc.country.name} options={[...new Set(smscBindings.map(item => item.country.name))]} onSelect={onSelectCountry}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>Country Code = {selectedCountryCode}</div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Operator</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName={senderConnection.smsc.operator.name} options={[...new Set(countryOperators.map(item => item.operator.name))]} onSelect={onSelectOperator}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>Operator Code = {selectedOperatorCode}</div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>SMS Connection</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "60%"}}>
                    <DropList selectName={senderConnection.smsc.smsc.name} options={[...new Set(operatorSMSC.map(item => item.smsc.name))]} onSelect={onSelectSMSC}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "20%", fontSize: "22px"}}>SMSC Value = {selectedSMSCVAlue}</div>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => editSenderConnection()}>Edit Sender Connection</button>
            </div>
        </div>
    )
}

export default EditSenderConnection