import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import ItemsList from "../../layout/List/ItemsList"
import DateTimeButton from "../../layout/Shared/DateTimeButton"
import ParametrizedTextArea from "../../layout/Shared/ParametrizedTextArea"
import { isEmpty, randomString, splitStringByLength, stippize } from "../../utils/helper"
import { generateMessagesFromRecipients } from "../../utils/message"


const AddMessageSegments = ({ sender, order, language, groupRecipients }) => {

    const { addMessage, bulkAddMessages, listMessageGroups } = useCoreApi()

    const [message, setMessage] = useState([])
    const [isOldGroups, setIsOldGroups] = useState([])
    const [messageLength, setMessageLength] = useState(0)
    const [parameterized, setParameterized] = useState(false)
    const [messageSegments, setMessageSegments] = useState([])
    const [scheduleDate, setScheduleDate] = useState("----:--:-- 00:00:00")
    const [messageRecipients, setMessageRecipients] = useState(groupRecipients)
    const [parameterizedMessageSegments, setParameterizedMessageSegments] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        getCurrentDate()

        const groupNames = (await listMessageGroups(1000000000000)).data.map(group => group.name)
        setIsOldGroups(! isEmpty(groupRecipients.filter(grcp => groupNames.includes(grcp.name))))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const getNumberOfRecipients = () => {
        let numberOfRecipients = 0
        groupRecipients.forEach(groupRecipient => {
            numberOfRecipients += groupRecipient.recipients.length
        })
        return numberOfRecipients
    }

    const onTextAreaContentChange = (message, parameterized) => {

        let content = parameterized ? message.content : message
        setParameterized(parameterized)
        setMessageLength(content?.length + content?.split(/\r\n|\r|\n/).length - 1)
        setMessageSegments(getMessageSegments(content))

        if (parameterized) {
            let recipients = []
            let segments = []
            let msgSegments = []
            for (let i = 0; i < message.messages.length; i++) {
                recipients.push({number: message.messages[i].title, attributes: message.messages[i].content.attributes})
                msgSegments = getMessageSegments(message.messages[i].content.message).map((segment, index) => {return {number: index + 1, content: segment}})
                segments.push(...msgSegments)
                message.messages[i].segments = msgSegments
            }
            setMessageRecipients([{name: "group-" + randomString(8), recipients: recipients}])
            setParameterizedMessageSegments(segments)
        }

        message?.messages?.forEach(msg => {msg.content = msg.content.message})
        setMessage(message)
    }

    const getMessageSegments = (message) => {
        let msglen = message?.length + message?.split(/\r\n|\r|\n/).length - 1

        if (msglen <= language.max_characters_length) {
            return [message]
        }

        if (msglen > language.max_characters_length) {
            return splitStringByLength(message, language.split_characters_length)
        }
    }

    const onUploadFileHandler = (messages) => {
        if (! isEmpty(messages)) {
            getElement("add-message-group-input").classList.remove("d-none")
        }
    }

    const addNewSMSMessage = async () => {

        let msg = []
        
        if (parameterized) {
            msg = await bulkAddMessages({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                scheduled_at: scheduleDate,
                group_recipients: messageRecipients,
                segments: parameterizedMessageSegments
            })

            console.log({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                scheduled_at: scheduleDate,
                group_recipients: messageRecipients,
                segments: parameterizedMessageSegments
            })
        } 
        else if (isOldGroups) {

            let segments = []
            let msgSegments = []
            let messages = generateMessagesFromRecipients(message, getRecipientsFromGroupRecipients())

            for (let i = 0; i < messages.length; i++) {
                msgSegments = getMessageSegments(messages[i].content).map((segment, index) => {return {number: index + 1, content: segment}})
                segments.push(...msgSegments)
                messages[i].segments = msgSegments
            }

            msg = await bulkAddMessages({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: {content: message, messages: messages},
                scheduled_at: scheduleDate,
                group_recipients: messageRecipients,
                segments: segments
            })
        }
        else {
            msg = await addMessage({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                scheduled_at: scheduleDate,
                group_recipients: groupRecipients,
                segments: messageSegments.map((messageSegment, index) => {return {number: index + 1, content: messageSegment}})
            })
        }
        
        if (! isEmpty(msg)) {
            navigate("content", "list-messages")
            showAlert("Message Sent Successfully!")
        } else {
            showAlert("Valid Message Information Required")
        }
    }

    const getRecipientsFromGroupRecipients = () => {
        let grprcp = []
        messageRecipients.forEach(msgrcp => {
            grprcp.push(...msgrcp.recipients)
        })
        return grprcp
    }

    const getScheduleDate = (scheduleDate) => {
        setScheduleDate(scheduleDate)
    }

    const getCurrentDate = () => {
        const userDate = new Date()
        const timezoneOffset = userDate.getTimezoneOffset() * 60000
        const localDate = new Date(userDate.getTime() - timezoneOffset)
        const selectedDateTime = localDate.toISOString().replace("T", " ").slice(0, 19)
        setScheduleDate(selectedDateTime)
    }

    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message</h1>

            <div className="mx-3 mt-5">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Schedule Date</div>
                <DateTimeButton onClick={getCurrentDate} onSelectDate={getScheduleDate}>
                    Schedule Now <i className="fas fa-table ms-3"></i>
                </DateTimeButton>
                <div className="d-inline-flex align-items-center ms-5" style={{fontSize: "25px"}}>Chosen Schedule Date: { scheduleDate }</div>
            </div>

            <div className="d-flex justify-content-between mx-3 mt-5">
                <div>Current Number of Characters: {messageLength}</div>
                <div>Remaining Number of Characters: {(language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)) - messageLength}</div>
                <div>Maximum number of Characters: {language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)}</div>
                <div>Message Segmentation Length: {language.split_characters_length}</div>
            </div>

            <div id="add-message-group-input" className="d-none" style={{fontSize: "25px", margin: "40px 10px"}}>
            <div>The uploaded recipients data is stored to our database with group name: <span style={{color: "orange"}}>{messageRecipients[0]?.name}</span></div>
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
                        onClick={() => setMessageRecipients([{name: getElement("change-message-group-name").value, recipients: messageRecipients[0].recipients}])}
                        >Change</button>
                </div>
            </div>

            <ParametrizedTextArea placeholder={"Enter Your Message."} height={"400px"} onContentChange={onTextAreaContentChange} onUploadFile={onUploadFileHandler}/>
            <div className="d-flex justify-content-evenly mt-5">
                <div>Single Message Cost: {order.pricelist.price}</div>
                <div>Total Cost: {(order.pricelist.price * (parameterized ? parameterizedMessageSegments.length : (messageSegments.length * getNumberOfRecipients())) || 0).toFixed(2)}</div>
            </div>

            <h1 className="add-user-header my-5">Message Segments</h1>
            <ItemsList items={messageSegments}/>
            <div className="update-user">
                <button className="button" onClick={addNewSMSMessage}>Push</button>
            </div>
        </div>
    )
}

export default AddMessageSegments