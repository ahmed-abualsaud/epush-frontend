import { useEffect, useRef, useState } from "react"
import ModalList from "../../../layout/List/ModalList"
import useCoreApi from "../../../api/useCoreApi"
import { isEmpty } from "../../../utils/helper"
import MessagesList from "../../../layout/List/MessagesList"

const RecipientsGroupAddition = ({ userID, setGroupRecipients}) => {

    const [numbers, setNumbers] = useState([])
    const [messageGroups, setMessageGroups] = useState([])

    const { getClientMessageGroups } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {

        let msgrps = await getClientMessageGroups(userID)

        setMessageGroups(isEmpty(msgrps) ? [] : msgrps.map(msgrp => {
            return {
                name: msgrp.name, 
                content: msgrp.recipients.map(recipient => ({
                    title: recipient.number, 
                    content: recipient.attributes
                }))
            }
        }))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const setGroupAndRecipients = (recipients, selectedGroups) => {
        setNumbers(recipients)
        setGroupRecipients(selectedGroups.map(group => {
            return {
                name: group.name, 
                recipients: group.content.map(recipient => ({
                    number: recipient.title, 
                    attributes: recipient.content
                }))
            }
        }))
    }

    return (
        isEmpty(messageGroups) ? 
        <div className="user-no-perm">The selected company has no groups yet</div> : 
        <div className="d-flex justify-content-between">
            <div style={{width: "60%", marginTop: "15px", display: "flex", flexDirection: "column"}}>
                <div style={{fontSize: "30px", marginLeft: "10px"}}>Select one of the following groups :</div>
                <ModalList items={messageGroups} setSelectedContents={setGroupAndRecipients}/>
            </div>
            <div style={{width: "40%"}}>
                <MessagesList messages={numbers}/>
            </div>
        </div>
    )
}

export default RecipientsGroupAddition