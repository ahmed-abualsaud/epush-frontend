import useMailApi from "../../../api/useMailApi";
import { showAlert } from "../../../utils/validator";

const DeleteMailTemplate = ({ template, onDelete }) => {

    const { deleteTemplate } = useMailApi()

    const deleteEntity = async () => {

        if (await deleteTemplate(template.id)) {
            onDelete()
            showAlert("Mail Template Deleted Successfully")
        } else {
            showAlert("Delete Mail Template Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Mail Template</h1>
            <p className="popup-content">Do you want to delete this mail template?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMailTemplate