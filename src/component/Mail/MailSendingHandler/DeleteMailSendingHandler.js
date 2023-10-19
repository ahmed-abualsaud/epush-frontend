import useMailApi from "../../../api/useMailApi"
import { showAlert } from "../../../utils/validator"

const DeleteMailSendingHandler = ({ mailSendingHandler, deletedRows, setDeletedRows }) => {

    const { deleteMailSendingHandler } = useMailApi()

    const deleteEntity = async () => {

        if (await deleteMailSendingHandler(mailSendingHandler.id)) {
            showAlert("Mail Sending Handler Deleted Successfully")
            setDeletedRows([...deletedRows, mailSendingHandler.id])
        } else {
            showAlert("Delete Mail Sending Handler Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Mail Sending Handler</h1>
            <p className="popup-content">Do you want to delete this mail sending handler?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMailSendingHandler