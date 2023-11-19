import useAuthApi from "../../api/useAuthApi";
import { showAlert } from "../../utils/validator";

const DeleteRole = ({ role, onDelete }) => {

    const { deleteRole } = useAuthApi()

    const deleteEntity = async () => {

        if (await deleteRole(role.id)) {
            onDelete()
            showAlert("Role Deleted Successfully")
        } else {
            showAlert("Delete Role Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Role</h1>
            <p className="popup-content">Do you want to delete this role?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteRole