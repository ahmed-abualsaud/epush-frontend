import useAuthApi from '../api/useAuthApi'
import '../assets/style/component/delete-modal.css'
import { removeElement } from '../utils/dom'
import { showAlert } from '../utils/validator'

const DeleteModal = ({ entity, entityID, deletedRows, setDeletedRows }) => {

    const { deleteUser, deleteRole, deletePermission } = useAuthApi()
    const deleteEntity = async () => {
        let deleted = false
        if (entity === "User") {
            deleted = await deleteUser(entityID);
        }

        if (entity === "Role") {
            deleted = await deleteRole(entityID);
        }

        if (entity === "Permission") {
            deleted = await deletePermission(entityID);
        }

        if (deleted) {
            showAlert(entity + " deleted successfully")
            setDeletedRows([...deletedRows, entityID])
        } else {
            showAlert("Delete " + entity + " Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete {entity}</h1>
            <p className="delete-content">Do you want to delete this {entity.toLowerCase()}?</p>
            <div className="delete-button-wrapper">
                <button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button>
            </div>
        </div>
    )

}

export default DeleteModal