import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteBanner = ({ banner, onDelete }) => {

    const { deleteBanner } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteBanner(banner.id)) {
            onDelete()
            showAlert("Banner Deleted Successfully")
        } else {
            showAlert("Delete Banner Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Banner</h1>
            <p className="popup-content">Do you want to delete this banner?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteBanner