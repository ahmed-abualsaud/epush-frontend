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
            <h1 className="delete-header">Delete SMSC</h1>
            <p className="delete-content">Do you want to delete this smsc?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSC