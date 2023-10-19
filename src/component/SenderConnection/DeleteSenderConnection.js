import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSenderConnection = ({ senderConnection, deletedRows, setDeletedRows }) => {

    const { deleteSenderConnection } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSenderConnection(senderConnection.id)) {
            showAlert("SenderConnection Deleted Successfully")
            setDeletedRows([...deletedRows, senderConnection.id])
        } else {
            showAlert("Delete SenderConnection Failed")
        }
    }

    return (
        <div>
            <h1 style={{fontSize: "55px"}} className="popup-header">Delete Sender Connection</h1>
            <p className="popup-content">Do you want to delete this sender connection?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSenderConnection