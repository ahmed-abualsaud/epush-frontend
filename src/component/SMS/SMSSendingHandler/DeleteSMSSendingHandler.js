import useSMSApi from "../../../api/useSMSApi"
import { showAlert } from "../../../utils/validator"

const DeleteSMSSendingHandler = ({ smsSendingHandler, onDelete }) => {

    const { deleteSMSSendingHandler } = useSMSApi()

    const deleteEntity = async () => {

        if (await deleteSMSSendingHandler(smsSendingHandler.id)) {
            onDelete()
            showAlert("SMS Sending Handler Deleted Successfully")
        } else {
            showAlert("Delete SMS Sending Handler Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete SMS Sending Handler</h1>
            <p className="popup-content">Do you want to delete this sms sending handler?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSSendingHandler