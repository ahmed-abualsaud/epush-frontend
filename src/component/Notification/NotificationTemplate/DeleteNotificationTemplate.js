import useNotificationApi from "../../../api/useNotificationApi";
import { showAlert } from "../../../utils/validator";

const DeleteNotificationTemplate = ({ template, deletedRows, setDeletedRows }) => {

    const { deleteTemplate } = useNotificationApi()

    const deleteEntity = async () => {

        if (await deleteTemplate(template.id)) {
            showAlert("Notification Template Deleted Successfully")
            setDeletedRows([...deletedRows, template.id])
        } else {
            showAlert("Delete Notification Template Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Notification Template</h1>
            <p className="delete-content">Do you want to delete this notification template?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteNotificationTemplate