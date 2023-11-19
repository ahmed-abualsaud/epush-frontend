import { showAlert } from '../../utils/validator'
import useCoreApi from '../../api/useCoreApi'

const DeleteAdmin = ({ admin, onDelete }) => {

    const { deleteAdmin } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteAdmin(admin.user_id)) {
            onDelete()
            showAlert("Admin Deleted Successfully")
        } else {
            showAlert("Delete Admin Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Admin</h1>
            <p className="popup-content">Do you want to delete this admin?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteAdmin