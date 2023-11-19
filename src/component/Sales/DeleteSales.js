import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSales = ({ sales, onDelete }) => {

    const { deleteSales } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSales(sales.id)) {
            onDelete()
            showAlert("Sales Deleted Successfully")
        } else {
            showAlert("Delete Sales Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Sales</h1>
            <p className="popup-content">Do you want to delete this sales?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSales