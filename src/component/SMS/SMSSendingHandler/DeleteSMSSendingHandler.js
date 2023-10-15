import useSMSApi from "../../../api/useSMSApi"
import { showAlert } from "../../../utils/validator"

const DeleteSMSSendingHandler = ({ smsSendingHandler, deletedRows, setDeletedRows }) => {

    const { deleteSMSSendingHandler } = useSMSApi()

    const deleteEntity = async () => {

        if (await deleteSMSSendingHandler(smsSendingHandler.id)) {
            showAlert("SMS Sending Handler Deleted Successfully")
            setDeletedRows([...deletedRows, smsSendingHandler.id])
        } else {
            showAlert("Delete SMS Sending Handler Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete SMS Sending Handler</h1>
            <p className="delete-content">Do you want to delete this sms sending handler?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSSendingHandler