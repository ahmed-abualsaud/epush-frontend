import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteMessageFilter = ({ messageFilter, deletedRows, setDeletedRows }) => {

    const { deleteMessageFilter } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessageFilter(messageFilter.id)) {
            showAlert("Message Filter Deleted Successfully")
            setDeletedRows([...deletedRows, messageFilter.id])
        } else {
            showAlert("Delete Message Filter Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Message Filter</h1>
            <p className="popup-content">Do you want to delete this message filter?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessageFilter