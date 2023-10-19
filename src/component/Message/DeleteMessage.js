import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteMessage = ({ message, deletedRows, setDeletedRows }) => {

    const { deleteMessage } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessage(message.id)) {
            showAlert("Message Deleted Successfully")
            setDeletedRows([...deletedRows, message.id])
        } else {
            showAlert("Delete Message Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Message</h1>
            <p className="popup-content">Do you want to delete this message?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessage