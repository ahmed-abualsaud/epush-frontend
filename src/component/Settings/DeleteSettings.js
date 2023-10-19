import { showAlert } from "../../utils/validator"
import useSettingsApi from "../../api/useSettingsApi"

const DeleteSettings = ({ settings, deletedRows, setDeletedRows }) => {

    const { deleteSettings } = useSettingsApi()

    const deleteEntity = async () => {

        if (await deleteSettings(settings.id)) {
            showAlert("Settings Deleted Successfully")
            setDeletedRows([...deletedRows, settings.id])
        } else {
            showAlert("Delete Settings Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Settings</h1>
            <p className="popup-content">Do you want to delete this settings?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSettings