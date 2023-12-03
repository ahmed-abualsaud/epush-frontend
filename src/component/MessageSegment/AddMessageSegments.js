import Hint from "../../layout/Shared/Hint"
import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { Settings } from "../../utils/settings"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import ItemsList from "../../layout/List/ItemsList"
import useSettingsApi from "../../api/useSettingsApi"
import { findSimilarWords, randomString } from "../../utils/strUtils"
import { navigate, render } from "../../setup/navigator"
import DateTimeButton from "../../layout/Shared/DateTimeButton"
import { generateMessagesFromRecipients, messageLanguageFilter } from "../../utils/message"
import ParametrizedTextArea from "../../layout/Shared/ParametrizedTextArea"
import { getDatetimeString, getTimezones, isEmpty, makeArrayUnique, splitStringByLength, startsWithAny, stippize } from "../../utils/helper"
import { useSelector } from "react-redux"
import Page from "../../page/Page"
import DropList from "../../layout/Shared/DropList"


const AddMessageSegments = ({ sender,senderConnections, order, language, groupRecipients }) => {

    const user = useSelector(state => state.auth.user)

    const { addMessage, bulkAddMessages, listMessageGroups, listMessageFilters } = useCoreApi()

    const { getSettingsValueByName } = useSettingsApi()

    const [message, setMessage] = useState([])
    const [isOldGroups, setIsOldGroups] = useState([])
    const [messageLength, setMessageLength] = useState(0)
    const [parameterized, setParameterized] = useState(false)
    const [validRecipients, setValidRecipients] = useState([])
    const [messageSegments, setMessageSegments] = useState([])
    const [blacklistedWords, setBlacklistedWords] = useState([])
    const [invalidRecipients, setInvalidRecipients] = useState([])
    const [maxNumOfSegments, setMaxNumOfSegments] = useState(null)
    const [pushButtonEnabled, setPushButtonEnabled] = useState(true)
    const [wordFilterThreshold, setWordFilterThreshold] = useState(null)
    const [scheduleDate, setScheduleDate] = useState("----:--:-- 00:00:00")
    const [selectedTimezone, setSelectedTimezone] = useState("Africa/Cairo")
    const [messageRecipients, setMessageRecipients] = useState(groupRecipients)
    const [messageApprovementLimit, setMessageApprovementLimit] = useState(null)
    const [validGroupRecipients, setValidGroupRecipients] = useState(groupRecipients)
    const [parameterizedMessageSegments, setParameterizedMessageSegments] = useState([])

    const [prefixes, setPrefixes] = useState(makeArrayUnique(senderConnections.map(sc => ({
        name: sc.smsc.country.name + ", " + sc.smsc.operator.name, 
        code: sc.smsc.country.code + sc.smsc.operator.code,
        recipients: []
    })), "name"))


    const setupLock = useRef(true)
    const setup = async () => {
        getCurrentDate()
        setWordFilterThreshold(await getSettingsValueByName(Settings.WORD_FILTER_THRESHOLD))
        setMaxNumOfSegments(await getSettingsValueByName(Settings.MAXIMUM_NUMBER_OF_MESSAGES_SEGMENTS))
        setMessageApprovementLimit(await getSettingsValueByName(Settings.MESSAGE_APPROVEMENT_LIMIT))

        const groupNames = (await listMessageGroups(1000000000000)).data.map(group => group.name)
        setIsOldGroups(! isEmpty(groupRecipients.filter(grcp => groupNames.includes(grcp.name))))

        setBlacklistedWords((await listMessageFilters(1000000000000))?.data?.map(word => word.name))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        if (maxNumOfSegments && messageSegments.length > maxNumOfSegments) {
            showAlert("Maximum number of segments exceeded")
        }
    }, [messageSegments, maxNumOfSegments])

    useEffect(() => {
        const valRecip = []
        const invRecip = []
        const allowedPrefixes = prefixes.map(px => px.code)
        message.messages = message.messages?.filter(msg => startsWithAny(msg.title, allowedPrefixes))
        const valRecipGrp = messageRecipients.map(msgRcip => ({name: msgRcip.name, recipients: msgRcip.recipients.filter(recip => startsWithAny(recip.number, allowedPrefixes))}))
        setMessage(message)
        setValidGroupRecipients(valRecipGrp)

        messageRecipients.forEach(gr => {
            const recipients = gr.recipients

            recipients.forEach(recipient => {
                if (startsWithAny(recipient.number, allowedPrefixes)) {
                    valRecip.push(recipient)
                } else {
                    invRecip.push(recipient)
                }
            })

            prefixes.forEach(prefix => {
                const matchingRecipients = recipients.filter(
                    recipient => startsWithAny(recipient.number, [prefix.code])
                )
                prefix.recipients.push(...matchingRecipients)
            })
        })

        setPrefixes(prefixes)
        setValidRecipients(valRecip)
        setInvalidRecipients(invRecip)
    }, [messageRecipients])

    const getNumberOfRecipients = () => {
        let numberOfRecipients = 0
        groupRecipients.forEach(groupRecipient => {
            numberOfRecipients += groupRecipient.recipients.length
        })
        return numberOfRecipients
    }

    const onTextAreaContentChange = (message, parameterized) => {

        let content = parameterized ? message.content : message
        let currentMessageLength = content?.length + content?.split(/\r\n|\r|\n/).length - 1

        const censoredWords = findSimilarWords(content, blacklistedWords, wordFilterThreshold)
        if (currentMessageLength > messageLength && ! isEmpty(censoredWords)) {
            setPushButtonEnabled(false)
            getElement("parametrize-messages-popup").click()
            render("modal-content", "censored-word", censoredWords[0].textWord, censoredWords[0].blacklistedWord)
        } else {
            setPushButtonEnabled(true)
        }

        setParameterized(parameterized)
        setMessageLength(currentMessageLength)
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

        if (! pushButtonEnabled) {
            showAlert("Couldn't send your message because it has a censored words")
            return
        }

        if (! isEmpty(invalidRecipients)) {
            render("modal-content", "invalid-recipients-modal", invalidRecipients, push)
            getElement("censored-words-popup").click()
            return
        }

        push()
    }

    const push = async () => {
        let msg = []

        if (isEmpty(validRecipients)) {
            showAlert("No valid recipients")
            return
        }

        if (parameterized) {
            msg = await bulkAddMessages({
                sender_id: sender.id,
                user_id: sender.user_id,
                order_id: order.id,
                message_language_id: language.id,
                content: message,
                scheduled_at: scheduleDate,
                group_recipients: validGroupRecipients.map(messageRecipient => {messageRecipient.user_id = sender.user_id; return messageRecipient}),
                segments: parameterizedMessageSegments,
                timezone: selectedTimezone
            })
        } 
        else if (isOldGroups) {

            let segments = []
            let msgSegments = []
            let messages = generateMessagesFromRecipients(message, validRecipients)

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
                group_recipients: validGroupRecipients.map(messageRecipient => {messageRecipient.user_id = sender.user_id; return messageRecipient}),
                segments: segments,
                timezone: selectedTimezone
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
                group_recipients: validGroupRecipients.map(messageRecipient => {messageRecipient.user_id = sender.user_id; return messageRecipient}),
                segments: messageSegments.map((messageSegment, index) => {return {number: index + 1, content: messageSegment}}),
                timezone: selectedTimezone
            })
        }
        
        if (! isEmpty(msg)) {
            navigate("content", "list-messages")
            showAlert("Message Sent Successfully!")
        } else {
            showAlert("Valid Message Information Required")
        }
    }

    const getScheduleDate = (scheduleDate) => {
        setScheduleDate(scheduleDate)
    }

    const getCurrentDate = () => {
        setScheduleDate(getDatetimeString())
    }

    const showRecipients = (recipients) => {
        render("modal-content", "items-list", recipients.map(recipient => recipient.number))
        getElement("censored-words-popup").click()
    }

    const onSelectTimezone = (timezone) => {
        setSelectedTimezone(timezone)
    }


    return (
        <Page title="Add New Message">
            <a id="censored-words-popup" className="d-none" href="#popup">popup</a>

            <div style={{borderTop: "1px solid #fff"}}>
                <Hint>
                    <div>1- The maximum number of a message segments is : {maxNumOfSegments}</div>
                    <div>2- The maximum number of message recipients who can receive messages without admin approval is : {messageApprovementLimit}</div>
                </Hint>
            </div>

            <div className="mx-3 mt-5">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Schedule Date</div>
                <DateTimeButton onClick={getCurrentDate} onSelectDate={getScheduleDate}>
                    Schedule Now <i className="fas fa-table ms-3"></i>
                </DateTimeButton>
                <div className="d-inline-flex align-items-center ms-5" style={{fontSize: "25px"}}>Chosen Schedule Date: { scheduleDate }</div>
            </div>

            <div className="my-5 mx-3">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Timezone:</div>
                <div className="d-inline-flex justify-content-center" style={{width: "50%"}}>
                    <DropList selectName="Africa/Cairo" options={getTimezones()} onSelect={onSelectTimezone}/>
                </div>
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

            <div className="d-flex justify-content-between mx-3 mt-5">
                <div>Current Number of Characters: {messageLength}</div>
                <div>Remaining Number of Characters: {(language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)) - messageLength}</div>
                <div>Maximum number of Characters: {language.max_characters_length > messageLength? language.max_characters_length : stippize(messageLength, language.split_characters_length)}</div>
                <div>Message Segmentation Length: {language.split_characters_length}</div>
            </div>

            <ParametrizedTextArea 
                height={"400px"} 
                placeholder={"Enter Your Message."} 
                onContentChange={onTextAreaContentChange} 
                onUploadFile={onUploadFileHandler} 
                textInputFilterFunction={(e) => messageLanguageFilter(e, language.characters, language.name)}
            />

            <div className="d-flex justify-content-evenly mt-5">
                <div>Single Message Cost: {order.pricelist.price}</div>
                <div>Total Cost: {(order.pricelist.price * (parameterized ? parameterizedMessageSegments.length : (messageSegments.length * getNumberOfRecipients())) || 0).toFixed(2)}</div>
            </div>

            <div className="mt-5">
                <Hint>
                    <div style={{color: "#fff"}}>
                        <div className="d-flex justify-content-evenly align-items-center">
                            <div style={{width: "50%"}}>
                                1- Number of <span style={{color: "red"}}>Invalid </span> 
                                recipients : <span style={{color: "red"}}>{invalidRecipients.length}</span> 
                            </div>
                            <div><button className="button" onClick={() => showRecipients(invalidRecipients)}>Show</button></div>
                        </div>
                        <div className="d-flex justify-content-evenly align-items-center">
                            <div style={{width: "50%"}}>
                                1- Number of <span style={{color: "red"}}>Valid </span> 
                                recipients : <span style={{color: "red"}}>{validRecipients.length}</span> 
                            </div>
                            <div><button className="button" onClick={() => showRecipients(validRecipients)}>Show</button></div>
                        </div>
                        {prefixes.map((prefix, index) => <div className="d-flex justify-content-evenly align-items-center">
                            <div style={{width: "50%"}}>
                                {index + 2}- Number of <span style={{color: "red"}}>{prefix.name} </span> 
                                recipients : <span style={{color: "red"}}>{prefix.recipients.length}</span>
                            </div>
                            <div><button className="button" onClick={() => showRecipients(prefix.recipients)}>Show</button></div>
                        </div>)}
                    </div>
                </Hint>
            </div>

            <h1 className="content-header my-5">Message Segments</h1>
            <ItemsList items={messageSegments}/>
            <div className="button-container">
                <button className="button" onClick={addNewSMSMessage}>Push</button>
            </div>
        </Page>
    )
}

export default AddMessageSegments