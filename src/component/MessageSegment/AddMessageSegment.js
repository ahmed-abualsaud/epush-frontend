import { useState } from "react"
import ParametrizedTextArea from "../../layout/Shared/ParametrizedTextArea"
import { isEmpty, splitStringByLength, stippize } from "../../utils/helper"
import ItemsList from "../../layout/List/ItemsList"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"

const AddMessageSegments = ({ sender, order, language, recipients }) => {

    const { addMessage, bulkAddMessages } = useCoreApi()

    const [message, setMessage] = useState([])
    const [messageLength, setMessageLength] = useState(0)
    const [parameterized, setParameterized] = useState(false)
    const [messageSegments, setMessageSegments] = useState([])
    const [messageRecipients, setMessageRecipients] = useState(recipients)
    const [parameterizedMessageSegments, setParameterizedMessageSegments] = useState([])

    const onTextAreaContentChange = (message, parameterized) => {
        setParameterized(parameterized)
        let content = parameterized ? message.content : message
        setMessage(message)
        setMessageLength(content?.length + content?.split(/\r\n|\r|\n/).length - 1)
        setMessageSegments(getMessageSegments(content))

        if (parameterized) {
            let recipis = []
            let segments = []
            let msgSegments = []
            for (let i = 0; i < message.messages.length; i++) {
                recipis.push({number: message.messages[i].title})
                msgSegments = getMessageSegments(message.messages[i].content).map((segment, index) => {return {number: index + 1, content: segment}})
                segments.push(...msgSegments)
                message.messages[i].segments = msgSegments
            }
            setMessageRecipients(recipis)
            setParameterizedMessageSegments(segments)
        }
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

    const addNewSMSMessage = async () => {
        let msg = []
        
        if (parameterized) {
            console.log({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                recipients: messageRecipients,
                segments: parameterizedMessageSegments
            })
            msg = await bulkAddMessages({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                recipients: messageRecipients,
                segments: parameterizedMessageSegments
            })
        } else {
            msg = await addMessage({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                recipients: recipients.map(recipient => {return {number: recipient}}),
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

    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message</h1>

            <div className="d-flex justify-content-between mx-3">
                <div>Current Number of Characters: {messageLength}</div>
                <div>Remaining Number of Characters: {(language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)) - messageLength}</div>
                <div>Maximum number of Characters: {language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)}</div>
                <div>Message Segmentation Length: {language.split_characters_length}</div>
            </div>

            <ParametrizedTextArea placeholder={"Enter Your Message."} height={"400px"} onContentChange={onTextAreaContentChange}/>
            <div className="d-flex justify-content-evenly mt-5">
                <div>Single Message Cost: {order.pricelist.price}</div>
                <div>Total Cost: {(order.pricelist.price * (parameterized ? parameterizedMessageSegments.length : (messageSegments.length * recipients.length)) || 0).toFixed(2)}</div>
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