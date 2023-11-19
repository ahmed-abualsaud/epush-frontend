import { useEffect, useState } from "react"
import Input from "../../layout/Shared/Input"
import TextArea2 from "../../layout/Shared/TextArea2"
import Page from "../../page/Page"
import useCoreApi from "../../api/useCoreApi"
import { useSelector } from "react-redux"
import { getElement } from "../../utils/dom"
import useTicketApi from "../../api/useTicketApi"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import { navigate } from "../../setup/navigator"

const AddTicket = () => {

    const [client, setClient] = useState([])
    const [senders, setSenders] = useState([])
    const [ticketContent, setTicketContent] = useState("")

    const { addTicket } = useTicketApi()
    const { getClient, getClientSenders } = useCoreApi()
    const user = useSelector(state => state.auth.user)

    useEffect( async () => {
        const clt = await getClient(user?.user?.id)
        if (clt) setClient(clt)

        const snd = await getClientSenders(user?.user?.id)
        if (snd) setSenders(snd)
    }, [])

    const onContentChange = (content) => {
        setTicketContent(content)
    }

    const sendTicket = async () => {

        const input = {
            user_id: user?.user?.id,
            first_name: getElement("first-name")?.value || client?.first_name,
            last_name: getElement("last-name")?.value || client?.last_name,
            email: getElement("email")?.value || client?.email,
            phone: getElement("phone")?.value || client?.phone,
            company_name: getElement("company-name")?.value || client?.company_name,
            sender_name: getElement("sender-name")?.value || client?.sender_name,
            content: ticketContent
        }

        if (isEmpty(input.content)) {
            showAlert("The issue description is required")
            return
        }

        if (isEmpty(input.sender_name)) {
            showAlert("Sender name is required")
            return
        }

        const result = await addTicket(input)
        if (! isEmpty(result)) {
            navigate("content", "list-client-tickets")
            showAlert("The issue has been submitted successfully")
        }
    }

    return (
        <Page title="Contact Us">
            <div className="d-flex justify-content-around">
                <Input id="first-name" type="text" icon="fas fa-signature" placeholder={"First Name: " + client.first_name} validrules="required" className="w-50"/>
                <Input id="last-name" type="text" icon="fas fa-signature" placeholder={"Last Name: " + client.last_name} validrules="required" className="w-50"/>
            </div>

            <div className="d-flex justify-content-around">
                <Input id="email" type="text" icon="fas fa-envelope" placeholder={"Email: " + client.email} validrules="required" className="w-50"/>
                <Input id="phone" type="text" icon="fas fa-phone" placeholder={"Phone Number: " + client.phone} validrules="required" className="w-50"/>
            </div>

            <div className="d-flex justify-content-around">
                <Input id="sender-name" type="text" icon="fas fa-share-from-square" placeholder="Sender Name" validrules="required" className="w-100" options={senders.map(sender => sender.name)}/>
            </div>

            <div className="m-2">
                <TextArea2 height="200px" placeholder="What we can do for you?" onContentChange={onContentChange}/>
            </div>

            <div className="button-container">
                <button className="button" onClick={sendTicket}>Send it</button>
            </div>
        </Page>
    )
}

export default AddTicket