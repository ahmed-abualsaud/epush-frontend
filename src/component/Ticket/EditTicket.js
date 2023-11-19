import { useState } from "react"
import useTicketApi from "../../api/useTicketApi"
import TextArea2 from "../../layout/Shared/TextArea2"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const EditTicket = ({ ticket, data }) => {

    const defaultMail = "Hi " + ticket.first_name + "\nYour complaint status has been updated to " + data.status + " and will remain in this status for approximately 3 to 7 days\nBest regards"
    const [mailContent, setMailContent] = useState(defaultMail)

    const { updateTicket } = useTicketApi()

    const onContentChange = (content) => {
        setMailContent(content)
    }

    const updateStatus = async () => {

        data.mail_content = mailContent
        const result = await updateTicket(ticket.id, data)
        if (! isEmpty(result)) {
            showAlert("Ticket Status Updated Successfully")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Update Ticket Status</h1>
            <p className="popup-content" style={{marginTop: "-20px"}}>The following mail will be sent to the ticket initiator, Would you like to edit it?</p>
            <div className="m-2">
                <TextArea2 
                    height="200px" 
                    content={defaultMail}
                    onContentChange={onContentChange}
                />
            </div>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button" onClick={() => updateStatus()}>Send</button></a>
            </div>
        </div>
    )
}

export default EditTicket