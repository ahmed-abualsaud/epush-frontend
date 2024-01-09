import { useEffect, useRef, useState } from "react"
import useCoreApi from "../../api/useCoreApi"
import DropList from "../../layout/Shared/DropList"
import AddMessageRecipients from "../MessageRecipient/AddMessageRecipients"
import { render } from "../../setup/navigator"
import { getElement } from "../../utils/dom"
import { isEmpty, startsWithAny } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import MasterListItem from "../../layout/List/MasterListItem"
import SlavesList from "../../layout/List/SlavesList"
import SlaveListItem from "../../layout/List/SlaveListItem"
import List from "../../layout/List/List"
import Page from "../../page/Page"

const AddMessage = () => {

    const [client, setClient] = useState([])
    const [senders, setSenders] = useState([])
    const [languages, setLanguages] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [clientOrder, setClientOrder] = useState({id: 0})
    const [selectedSender, setSelectedSender] = useState({})
    const [selectedClient, setSelectedClient] = useState({})
    const [groupRecipients, setGroupRecipients] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState({})
    const [senderConnections, setSenderConnections] = useState([])
    const [selectedSenderConnections, setSelectedSenderConnections] = useState([])

    const { listClients, getClientSenders, listMessageLanguages, getClientLatestOrder, listMessageGroups, getSenderConnections } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {

        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

        const lng = await listMessageLanguages(1000000000000)
        if (lng?.data) setLanguages(lng.data)

        const msgrp = await listMessageGroups(1000000000000)
        if (msgrp?.data) setMessageGroups(msgrp.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        isEmpty(selectedSenderConnections) ? 
        getElement("upload-recipients-element").classList.add("d-none") :
        getElement("upload-recipients-element").classList.remove("d-none")
    }, [selectedSenderConnections])

    useEffect(() => {
        const groupNames = groupRecipients.map(groupRecipient => groupRecipient.name)
        if (! isEmpty(groupRecipients) && isEmpty(messageGroups.filter(messageGroup => groupNames.includes(messageGroup.name)))) {
            getElement("add-message-group-input")?.classList.remove("d-none")            
        } else {
            getElement("add-message-group-input")?.classList.add("d-none")            
        }
    }, [groupRecipients])

    const onSelectClient = async (option) => {
        const selectedClient = client.find(c => c.company_name === option)
        setSelectedClient(selectedClient)
        setClientOrder(await getClientLatestOrder(selectedClient.user_id))
        setSenders(await getClientSenders(selectedClient.user_id))
        getElement("client-senders-droplist")?.classList.remove("d-none")
    }

    const onSelectSender = async (option) => {
        let sender = senders.find(s => s.name === option)
        setSenderConnections((await getSenderConnections(sender.id)).filter(c => c.approved === true))
        setSelectedSender(sender)
        getElement("client-sender-connections-droplist")?.classList.remove("d-none")
    }

    const onSelectConnection = async (selected, item) => {
        const connectionID = item.querySelector(".connection-id").innerText
        const selectedConnection = senderConnections.find(senderConnection => senderConnection.id === parseInt(connectionID))

        selected?
        setSelectedSenderConnections([...selectedSenderConnections, selectedConnection]) :
        setSelectedSenderConnections(selectedSenderConnections.filter(sc => sc.id !== selectedConnection.id))
    }

    const onSelectLanguage = (option) => {
        setSelectedLanguage(languages.find(lng => lng.name === option))
    }

    const renderAddMessageSegments = () => {
        if (isEmpty(selectedSender)) {
            showAlert("Sender is required")
            return
        }

        if (isEmpty(selectedSenderConnections)) {
            showAlert("SMS Connection  is required")
            return
        }

        if (isEmpty(selectedLanguage)) {
            showAlert("Please select a language")
            return
        }

        render("content", "add-message-segments", selectedSender, selectedSenderConnections, clientOrder, selectedLanguage, groupRecipients)
    }

    const next = () => {

        if (isEmpty(groupRecipients)) {
            showAlert("Please enter the recipients numbers")
            return
        }

        const invalidRecipients = []
        const allowedPrefixes = selectedSenderConnections.map(sc => sc.smsc.country.code + sc.smsc.operator.code)
        groupRecipients.forEach(gr => gr.recipients.forEach(recipient => {
            if (! startsWithAny(recipient.number, allowedPrefixes)) {
                invalidRecipients.push(recipient)
            }
        }))

        // if (! isEmpty(invalidRecipients)) {
        //     render("modal-content", "invalid-recipients-modal", invalidRecipients, renderAddMessageSegments)
        //     getElement("continue-with-invalid-recipients").click()
        //     return
        // }

        renderAddMessageSegments()
    }

    const setGroupRecipientsData = (data) => {
        setGroupRecipients(data)
    }

    return (
        <Page id="add-message-form" title="Add New Message">
            <a id="continue-with-invalid-recipients" className="d-none" href="#popup"></a>

            <div className="my-5 mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Message Language:</div>
                <div className="d-inline-flex justify-content-center" style={{width: "30%"}}>
                    <DropList selectName="Select Language" options={languages.map(item => item.name)} onSelect={onSelectLanguage}/>
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>Maximum Characters = {selectedLanguage?.max_characters_length || 0}</div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>Split Length = {selectedLanguage?.split_characters_length || 0}</div>
            </div>

            <div className=" mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            {selectedClient.balance <= 0 ? <div className="no-data">Your wallet is empty</div> :
            isEmpty(clientOrder)? <div className="no-data">You have to make an order first</div> :
            clientOrder?.pricelist?.price > selectedClient.balance? <div className="no-data">You Don't have enough credits</div> :
            <div>
                <div id="client-senders-droplist" className="mt-5 mx-4 d-none">
                    {isEmpty(senders)? <div className="no-data">The selected client does'nt have any senders yet!</div>: 
                    <div>
                        <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Sender Name</div>
                        <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                            <DropList selectName="Select Sender Name" options={senders.map(item => item.name)} onSelect={onSelectSender}/>
                        </div>
                    </div>}
                </div>

                <div id="client-sender-connections-droplist" className="mx-4 d-none">
                    {isEmpty(senderConnections)? <div className="no-data">The selected Sender does'nt have any approved sms connections yet!</div>: 
                    <div>
                        <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>SMS Connection</div>
                        <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                            {[...new Set(senderConnections.map(item => item.smsc.country.name))].map(senderConnection =>
                            <List>
                                <MasterListItem>
                                    <div className="d-flex align-items-center justify-content-center">
                                        {senderConnection}
                                    </div>
                                </MasterListItem>
                                <SlavesList>
                                    {senderConnections.filter(item => item.smsc.country.name === senderConnection).map(connection => (
                                        <SlaveListItem onSelectItem={onSelectConnection}>
                                            <div className="connection-id d-none">{connection.id}</div>
                                            <div>{connection.smsc.operator.name + ", " + connection.smsc.smsc.name}</div>
                                            <div style={{marginLeft: "auto"}}>{"Number Prefix: " + connection.smsc.country.code + connection.smsc.operator.code}</div>
                                        </SlaveListItem>
                                    ))}
                                </SlavesList>
                            </List>)}
                        </div>
                    </div>}
                </div>

                <div id="upload-recipients-element" className="d-none">
                    <AddMessageRecipients userID={selectedClient.user_id} setGroupRecipients={setGroupRecipientsData} addMessageSegmentsRenderFunction={renderAddMessageSegments}/>

                    <div id="add-message-group-input" className="d-none" style={{fontSize: "25px", margin: "40px 10px"}}>
                        <div>The uploaded recipients data is stored to our database with group name: <span style={{color: "orange"}}>{groupRecipients[0]?.name}</span></div>
                        <div>
                            <span>Do you want to change the name of the group ?</span> 
                            <input 
                                id="change-message-group-name"
                                style={{
                                    padding: "10px", 
                                    margin: "20px", 
                                    border: "2px solid #063F30", 
                                    borderRadius: "10px"
                                }}
                                type="text" 
                                placeholder="Type the new group name"
                            />
                            <button 
                                style={{
                                    marginLeft: "-100px", 
                                    padding: "10px", 
                                    borderTopRightRadius: "10px", 
                                    borderBottomRightRadius: "10px", 
                                    color: "#fff", 
                                    backgroundColor: "#063F30"
                                }}
                                onClick={() => setGroupRecipients([{name: getElement("change-message-group-name").value, recipients: groupRecipients[0].recipients}])}
                            >Change</button>
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <button className="button" onClick={next}>Next</button>
                </div>
            </div>}
        </Page>
    )
}

export default AddMessage