import useSMSApi from "../../../api/useSMSApi";
import { showAlert } from "../../../utils/validator";

const DeleteSMSTemplate = ({ template, deletedRows, setDeletedRows }) => {

    const { deleteTemplate } = useSMSApi()

    const deleteEntity = async () => {

        if (await deleteTemplate(template.id)) {
            showAlert("SMS Template Deleted Successfully")
            setDeletedRows([...deletedRows, template.id])
        } else {
            showAlert("Delete SMS Template Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete SMS Template</h1>
            <p className="delete-content">Do you want to delete this sms template?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSMSTemplate