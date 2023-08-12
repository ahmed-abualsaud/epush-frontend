import useAuthApi from "../../api/useAuthApi";
import { showAlert } from "../../utils/validator";

const DeletePermission = ({ permission, deletedRows, setDeletedRows }) => {

    const { deletePermission } = useAuthApi()

    const deleteEntity = async () => {

        if (await deletePermission(permission.id)) {
            showAlert("Permission Deleted Successfully")
            setDeletedRows([...deletedRows, permission.id])
        } else {
            showAlert("Delete Permission Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Permission</h1>
            <p className="delete-content">Do you want to delete this permission?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeletePermission