import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSMSC = ({ smsc, onDelete }) => {

    const { deleteSMSC } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSMSC(smsc.id)) {
            onDelete()
            showAlert("SMSC Deleted Successfully")
        } else {
            showAlert("Delete SMSC Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete SMSC</h1>
            <p className="popup-content">Do you want to delete this smsc?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSC