import useAuthApi from "../../api/useAuthApi";
import { showAlert } from "../../utils/validator";

const DeleteRole = ({ role, deletedRows, setDeletedRows }) => {

    const { deleteRole } = useAuthApi()

    const deleteEntity = async () => {

        if (await deleteRole(role.id)) {
            showAlert("Role Deleted Successfully")
            setDeletedRows([...deletedRows, role.id])
        } else {
            showAlert("Delete Role Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Role</h1>
            <p className="delete-content">Do you want to delete this role?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteRole