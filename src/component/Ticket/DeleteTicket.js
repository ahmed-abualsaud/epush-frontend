import useTicketApi from "../../api/useTicketApi";
import { showAlert } from "../../utils/validator";

const DeleteTicket = ({ ticket, onDelete }) => {

    const { deleteTicket } = useTicketApi()

    const deleteEntity = async () => {

        if (await deleteTicket(ticket.id)) {
            onDelete()
            showAlert("Ticket Deleted Successfully")
        } else {
            showAlert("Delete Ticket Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Ticket</h1>
            <p className="popup-content">Do you want to delete this ticket?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteTicket