import useAuthApi from '../../api/useAuthApi'
import '../../assets/style/component/delete-modal.css'
import { showAlert } from '../../utils/validator'

const DeleteUser = ({ user, deletedRows, setDeletedRows }) => {

    const { deleteUser } = useAuthApi()

    const deleteEntity = async () => {

        if (await deleteUser(user.id)) {
            showAlert("User Deleted Successfully")
            setDeletedRows([...deletedRows, user.id])
        } else {
            showAlert("Delete User Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete User</h1>
            <p className="delete-content">Do you want to delete this user?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteUser