import useCoreApi from "../../api/useCoreApi"
import { showAlert } from "../../utils/validator"

const DeleteMessageGroupRecipient = ({ messageGroupRecipient, deletedRows, setDeletedRows }) => {

    const { deleteMessageGroupRecipient } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessageGroupRecipient(messageGroupRecipient.id)) {
            showAlert("Message Group Recipient Deleted Successfully")
            setDeletedRows([...deletedRows, messageGroupRecipient.id])
        } else {
            showAlert("Delete Message Group Recipient Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Message Group Recipient</h1>
            <p className="delete-content">Do you want to delete this message group recipient?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessageGroupRecipient