import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteOperator = ({ operator, deletedRows, setDeletedRows }) => {

    const { deleteOperator } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteOperator(operator.id)) {
            showAlert("Operator Deleted Successfully")
            setDeletedRows([...deletedRows, operator.id])
        } else {
            showAlert("Delete Operator Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Operator</h1>
            <p className="popup-content">Do you want to delete this operator?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteOperator