import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteCountry = ({ country, onDelete }) => {

    const { deleteCountry } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteCountry(country.id)) {
            onDelete()
            showAlert("Country Deleted Successfully")
        } else {
            showAlert("Delete Country Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Country</h1>
            <p className="popup-content">Do you want to delete this country?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteCountry