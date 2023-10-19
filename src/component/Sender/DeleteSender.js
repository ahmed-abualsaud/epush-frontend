import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSender = ({ sender, deletedRows, setDeletedRows }) => {

    const { deleteSender } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSender(sender.id)) {
            showAlert("Sender Deleted Successfully")
            setDeletedRows([...deletedRows, sender.id])
        } else {
            showAlert("Delete Sender Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Sender</h1>
            <p className="popup-content">Do you want to delete this sender?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSender