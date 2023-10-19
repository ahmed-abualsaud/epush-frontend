import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteBusinessField = ({ businessField, deletedRows, setDeletedRows }) => {

    const { deleteBusinessField } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteBusinessField(businessField.id)) {
            showAlert("Business Field Deleted Successfully")
            setDeletedRows([...deletedRows, businessField.id])
        } else {
            showAlert("Delete Business Field Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Business Field</h1>
            <p className="popup-content">Do you want to delete this business field?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteBusinessField