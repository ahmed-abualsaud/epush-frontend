import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeletePricelist = ({ pricelist, onDelete }) => {

    const { deletePricelist } = useCoreApi()

    const deleteEntity = async () => {

        if (await deletePricelist(pricelist.id)) {
            onDelete()
            showAlert("Pricelist Deleted Successfully")
        } else {
            showAlert("Delete Pricelist Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Pricelist</h1>
            <p className="popup-content">Do you want to delete this pricelist?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeletePricelist