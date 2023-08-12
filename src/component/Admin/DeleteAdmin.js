import '../../assets/style/component/delete-modal.css'
import { showAlert } from '../../utils/validator'
import useCoreApi from '../../api/useCoreApi'

const DeleteAdmin = ({ admin, deletedRows, setDeletedRows }) => {

    const { deleteAdmin } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteAdmin(admin.user_id)) {
            showAlert("Admin Deleted Successfully")
            setDeletedRows([...deletedRows, admin.id])
        } else {
            showAlert("Delete Admin Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Admin</h1>
            <p className="delete-content">Do you want to delete this admin?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteAdmin