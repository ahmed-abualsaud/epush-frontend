import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeletePricelist = ({ pricelist, deletedRows, setDeletedRows }) => {

    const { deletePricelist } = useCoreApi()

    const deleteEntity = async () => {

        if (await deletePricelist(pricelist.id)) {
            showAlert("Pricelist Deleted Successfully")
            setDeletedRows([...deletedRows, pricelist.id])
        } else {
            showAlert("Delete Pricelist Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Pricelist</h1>
            <p className="delete-content">Do you want to delete this pricelist?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeletePricelist