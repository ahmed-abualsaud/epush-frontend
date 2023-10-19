import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteMessageLanguage = ({ messageLanguage, deletedRows, setDeletedRows }) => {

    const { deleteMessageLanguage } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessageLanguage(messageLanguage.id)) {
            showAlert("Message Language Deleted Successfully")
            setDeletedRows([...deletedRows, messageLanguage.id])
        } else {
            showAlert("Delete Message Language Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Message Language</h1>
            <p className="popup-content">Do you want to delete this message language?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessageLanguage