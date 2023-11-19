import useCoreApi from "../../api/useCoreApi"
import { showAlert } from "../../utils/validator"

const DeleteMessageGroupRecipient = ({ messageGroupRecipient, onDelete }) => {

    const { deleteMessageGroupRecipient } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessageGroupRecipient(messageGroupRecipient.id)) {
            onDelete()
            showAlert("Message Group Recipient Deleted Successfully")
        } else {
            showAlert("Delete Message Group Recipient Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Message Group Recipient</h1>
            <p className="popup-content">Do you want to delete this message group recipient?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessageGroupRecipient