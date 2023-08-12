import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteSales = ({ sales, deletedRows, setDeletedRows }) => {

    const { deleteSales } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteSales(sales.id)) {
            showAlert("Sales Deleted Successfully")
            setDeletedRows([...deletedRows, sales.id])
        } else {
            showAlert("Delete Sales Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Sales</h1>
            <p className="delete-content">Do you want to delete this sales?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteSales