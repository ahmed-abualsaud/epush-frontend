import useAuthApi from '../../api/useAuthApi'
import { showAlert } from '../../utils/validator'


const DeleteUser = ({ user, onDelete }) => {

    const { deleteUser } = useAuthApi()

    const deleteEntity = async () => {

        if (await deleteUser(user.id)) {
            onDelete()
            showAlert("User Deleted Successfully")
        } else {
            showAlert("Delete User Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete User</h1>
            <p className="popup-content">Do you want to delete this user?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteUser