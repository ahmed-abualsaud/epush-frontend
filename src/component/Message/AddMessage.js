import { useEffect, useRef, useState } from "react"
import useCoreApi from "../../api/useCoreApi"
import DropList from "../../layout/Shared/DropList"
import AddMessageRecipients from "../MessageRecipient/AddMessageRecipients"
import { render } from "../../setup/navigator"
import { getElement } from "../../utils/dom"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const AddMessage = () => {

    const [client, setClient] = useState([])
    const [senders, setSenders] = useState([])
    const [languages, setLanguages] = useState([])
    const [recipients, setRecipients] = useState({})
    const [clientOrder, setClientOrder] = useState({id: 0})
    const [selectedSender, setSelectedSender] = useState({})
    const [selectedClient, setSelectedClient] = useState({})
    const [selectedLanguage, setSelectedLanguage] = useState({})

    const { listClients, getClientSenders, listMessageLanguages, getClientLatestOrder } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

        const lng = await listMessageLanguages(1000000000000)
        if (lng?.data) setLanguages(lng.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSelectClient = async (option) => {
        const selectedClient = client.find(c => c.company_name === option)
        setSelectedClient(selectedClient)
        setClientOrder(await getClientLatestOrder(selectedClient.user_id))
        setSenders(await getClientSenders(selectedClient.user_id))
        getElement("client-senders-droplist")?.classList.remove("d-none")
    }

    const onSelectSender = (option) => {
        setSelectedSender(senders.find(s => s.name === option))
    }

    const onSelectLanguage = (option) => {
        setSelectedLanguage(languages.find(lng => lng.name === option))
    }

    const renderAddMessageSegments = () => {
        if (isEmpty(selectedSender)) {
            showAlert("Sender is required")
            return
        }

        if (isEmpty(selectedLanguage)) {
            showAlert("Please select a language")
            return
        }

        render("content", "add-message-segments", selectedSender, clientOrder, selectedLanguage, recipients)
    }

    const next = () => {

        if (isEmpty(recipients)) {
            showAlert("Please enter the recipients numbers")
            return
        }

        renderAddMessageSegments()
    }

    return (
        <div id="add-message-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message</h1>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            {selectedClient.balance <= 0 ? <div className="user-no-perm">Your wallet is empty</div> :
            isEmpty(clientOrder)? <div className="user-no-perm">You have to make an order first</div> :
            clientOrder?.pricelist?.price > selectedClient.balance? <div className="user-no-perm">You Don't have enough credits</div> :
            <div>
                    <div id="client-senders-droplist" className="mt-5 d-none">
                        {isEmpty(senders)? <div className="user-no-perm">The selected client does'nt have any senders yet!</div>: 
                            <div>
                                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Sender Name</div>
                                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                                    <DropList selectName="Select Sender Name" options={senders.map(item => item.name)} onSelect={onSelectSender}/>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="mt-5">
                        <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Message Language:</div>
                        <div className="d-inline-flex justify-content-center" style={{width: "30%"}}>
                            <DropList selectName="Select Language" options={languages.map(item => item.name)} onSelect={onSelectLanguage}/>
                        </div>
                        <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>Maximum Characters = {selectedLanguage?.max_characters_length || 0}</div>
                        <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>Split Length = {selectedLanguage?.split_characters_length || 0}</div>
                    </div>

                    <AddMessageRecipients setRecipients={setRecipients} addMessageSegmentsRenderFunction={renderAddMessageSegments}/>

                    <div className="update-user">
                        <button className="button" onClick={next}>Next</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddMessage