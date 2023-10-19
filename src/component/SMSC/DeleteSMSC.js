import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSMSC = ({ smsc, deletedRows, setDeletedRows }) => {

    const { deleteSMSC } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSMSC(smsc.id)) {
            showAlert("SMSC Deleted Successfully")
            setDeletedRows([...deletedRows, smsc.id])
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