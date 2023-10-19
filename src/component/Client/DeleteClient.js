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
            <h1 className="popup-header">Delete Client</h1>
            <p className="popup-content">Do you want to delete this client?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeleteClient