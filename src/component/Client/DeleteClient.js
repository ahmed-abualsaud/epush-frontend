import '../../assets/style/component/delete-modal.css'
import { showAlert } from '../../utils/validator'
import useCoreApi from '../../api/useCoreApi'

const DeleteClient = ({ client, deletedRows, setDeletedRows }) => {

    const { deleteClient } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteClient(client.user_id)) {
            showAlert("Client Deleted Successfully")
            setDeletedRows([...deletedRows, client.id])
        } else {
            showAlert("Delete Client Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Client</h1>
            <p className="delete-content">Do you want to delete this client?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteClient