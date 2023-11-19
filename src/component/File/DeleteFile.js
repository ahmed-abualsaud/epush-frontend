import useFileApi from "../../api/useFileApi";
import { showAlert } from "../../utils/validator";

const DeleteFile = ({ file, onDelete }) => {

    const { deleteFile } = useFileApi()

    const deleteEntity = async () => {

        if (await deleteFile(file.id)) {
            onDelete()
            showAlert("File Deleted Successfully")
        } else {
            showAlert("Delete File Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete File</h1>
            <p className="popup-content">Do you want to delete this file?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteFile