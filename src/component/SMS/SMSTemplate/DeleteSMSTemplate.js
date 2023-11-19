import useSMSApi from "../../../api/useSMSApi";
import { showAlert } from "../../../utils/validator";

const DeleteSMSTemplate = ({ template, onDelete }) => {

    const { deleteTemplate } = useSMSApi()

    const deleteEntity = async () => {

        if (await deleteTemplate(template.id)) {
            onDelete()
            showAlert("SMS Template Deleted Successfully")
        } else {
            showAlert("Delete SMS Template Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete SMS Template</h1>
            <p className="popup-content">Do you want to delete this sms template?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSTemplate