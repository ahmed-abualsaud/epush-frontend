import useFileApi from "../../api/useFileApi";
import { showAlert } from "../../utils/validator";

const DeleteFolder = ({ folder, onDelete }) => {

    const { deleteFolder } = useFileApi()

    const deleteEntity = async () => {

        if (await deleteFolder(folder.id)) {
            onDelete()
            showAlert("Folder Deleted Successfully")
        } else {
            showAlert("Delete Folder Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Folder</h1>
            <p className="popup-content">Do you want to delete this folder?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteFolder