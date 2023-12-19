import { useEffect, useRef, useState } from "react"
import useCoreApi from "../../api/useCoreApi"
import DropList from "../../layout/Shared/DropList"
import AddMessageRecipients from "../MessageRecipient/AddMessageRecipients"
import { render } from "../../setup/navigator"
import { getElement } from "../../utils/dom"
import { isEmpty, startsWithAny } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import { useSelector } from "react-redux"
import Section from "../../layout/Shared/Section"
import Page from "../../page/Page"

const AddClientMessage = () => {

    const [senders, setSenders] = useState([])
    const [languages, setLanguages] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [clientOrder, setClientOrder] = useState({id: 0})
    const [selectedSender, setSelectedSender] = useState({})
    const [selectedClient, setSelectedClient] = useState({})
    const [groupRecipients, setGroupRecipients] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState({})
    const [senderConnections, setSenderConnections] = useState([])
    const [unapprovedSenderConnections, setUnapprovedSenderConnections] = useState([])

    const { getClient, getClientSenders, listMessageLanguages, getClientLatestOrder, listMessageGroups, getSenderConnections } = useCoreApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        setSelectedClient(await getClient(user?.user?.id))
        setSenders(await getClientSenders(user?.user?.id))
        setClientOrder(await getClientLatestOrder(user?.user?.id))

        const lng = await listMessageLanguages(1000000000000)
        if (lng?.data) setLanguages(lng.data)

        const msgrp = await listMessageGroups(1000000000000)
        if (msgrp?.data) setMessageGroups(msgrp.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        const groupNames = groupRecipients.map(groupRecipient => groupRecipient.name)
        if (! isEmpty(groupRecipients) && isEmpty(messageGroups.filter(messageGroup => groupNames.includes(messageGroup.name)))) {
            getElement("add-message-group-input")?.classList.remove("d-none")            
        } else {
            getElement("add-message-group-input")?.classList.add("d-none")            
        }
    }, [groupRecipients])

    const onSelectSender = async (option) => {
        let sender = senders.find(s => s.name === option)
        setSelectedSender(sender)
        const sc = await getSenderConnections(sender.id)
        setSenderConnections(sc.filter(c => c.approved === true))
        setUnapprovedSenderConnections(sc.filter(c => c.approved === false))
        getElement("client-sender-approved-connections")?.classList.remove("d-none")
        getElement("client-sender-unapproved-connections")?.classList.remove("d-none")
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

        render("content", "add-client-message2", selectedSender, senderConnections, clientOrder, selectedLanguage, groupRecipients)
    }

    const next = () => {

        if (isEmpty(groupRecipients)) {
            showAlert("Please enter the recipients numbers")
            return
        }

        const invalidRecipients = []
        const allowedPrefixes = senderConnections.map(sc => sc.smsc.country.code + sc.smsc.operator.code)
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

    return (
        <Page title="Add New Message">
            <a id="continue-with-invalid-recipients" className="d-none" href="#popup"></a>

            <div className="my-5 mx-3">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Message Language:</div>
                <div className="d-inline-flex justify-content-center" style={{width: "30%"}}>
                    <DropList selectName="Select Language" options={languages.map(item => item.name)} onSelect={onSelectLanguage}/>
                </div>
                {/* <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>
                    Maximum Characters = {selectedLanguage?.max_characters_length || 0}
                </div>
                <div className="d-inline-flex align-items-center justify-content-center" style={{width: "25%", fontSize: "22px"}}>
                    Split Length = {selectedLanguage?.split_characters_length || 0}
                </div> */}
            </div>

            {selectedClient.balance <= 0 ? <div className="no-data">Your wallet is empty</div> :
            isEmpty(clientOrder)? <div className="no-data">You have to make an order first</div> :
            clientOrder?.pricelist?.price > selectedClient.balance? <div className="no-data">You Don't have enough credits</div> :
            <div>
                <div className="my-5 mx-3">
                    {isEmpty(senders)? <div className="no-data">The selected client does'nt have any senders yet!</div>: 
                    <div>
                        <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Sender Name</div>
                        <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                            <DropList selectName="Select Sender Name" options={senders.map(item => item.name)} onSelect={onSelectSender}/>
                        </div>
                    </div>}
                </div>

                <Section id="client-sender-approved-connections" title="You Can Send To" className="d-none">
                    {isEmpty(senderConnections)? <div className="no-data" style={{margin: "30px 0"}}>
                        The selected Sender does'nt have any approved sms connections yet!
                    </div>:
                    [...new Set(senderConnections.map(item => item.smsc.country.name))].map(country =>
                        <div className="d-flex justify-content-around" style={{margin: "20px 0"}}>
                            <div>{country}:</div>
                            <div>{[...new Set(senderConnections.filter(item => item.smsc.country.name === country).map(item => item.smsc.operator.name))].map(operator => 
                                <span style={{display: "inline-block", margin: "0 10px"}}>{operator}</span>
                            )}</div>
                        </div>
                    )}
                </Section>

                {/* <Section id="client-sender-unapproved-connections" title="You Can Not Send To" className="d-none">
                    {isEmpty(unapprovedSenderConnections)? <div style={{fontSize: "40px", textAlign: "center", margin: "30px 0"}}>
                        The selected sender does'nt have any unapproved sms connections!
                    </div>:
                    [...new Set(unapprovedSenderConnections.map(item => item.smsc.country.name))].map(country =>
                        <div className="d-flex justify-content-around" style={{margin: "20px 0"}}>
                            <div>{country}:</div>
                            <div>{[...new Set(unapprovedSenderConnections.filter(item => item.smsc.country.name === country).map(item => item.smsc.operator.name))].map(operator => 
                                <span style={{display: "inline-block", margin: "0 10px"}}>{operator}</span>
                            )}</div>
                        </div>
                    )}
                </Section> */}

                {! isEmpty(senderConnections) && <div>
                    <AddMessageRecipients userID={selectedClient.user_id} setGroupRecipients={setGroupRecipients} addMessageSegmentsRenderFunction={renderAddMessageSegments}/>

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
                </div>}

                <div className="button-container">
                    <button className="button" onClick={next}>Next</button>
                </div>
            </div>}
        </Page>
    )
}

export default AddClientMessage