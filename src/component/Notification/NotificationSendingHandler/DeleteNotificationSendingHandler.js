import useNotificationApi from "../../../api/useNotificationApi"
import { showAlert } from "../../../utils/validator"

const DeleteNotificationSendingHandler = ({ notificationSendingHandler, deletedRows, setDeletedRows }) => {

    const { deleteNotificationSendingHandler } = useNotificationApi()

    const deleteEntity = async () => {

        if (await deleteNotificationSendingHandler(notificationSendingHandler.id)) {
            showAlert("Notification Sending Handler Deleted Successfully")
            setDeletedRows([...deletedRows, notificationSendingHandler.id])
        } else {
            showAlert("Delete Notification Sending Handler Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Notification Sending Handler</h1>
            <p className="popup-content">Do you want to delete this notification sending handler?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteNotificationSendingHandler