import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSMSCBinding = ({ smscBinding, deletedRows, setDeletedRows }) => {

    const { deleteSMSCBinding } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSMSCBinding(smscBinding.id)) {
            showAlert("SMSC Binding Deleted Successfully")
            setDeletedRows([...deletedRows, smscBinding.id])
        } else {
            showAlert("Delete SMSC Binding Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete SMSC Binding</h1>
            <p className="popup-content">Do you want to delete this smsc binding?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSCBinding