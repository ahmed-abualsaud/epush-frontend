import useExpenseApi from "../../api/useExpenseApi";
import { showAlert } from "../../utils/validator";

const DeletePaymentMethod = ({ paymentMethod, deletedRows, setDeletedRows }) => {

    const { deletePaymentMethod } = useExpenseApi()

    const deleteEntity = async () => {

        if (await deletePaymentMethod(paymentMethod.id)) {
            showAlert("Payment Method Deleted Successfully")
            setDeletedRows([...deletedRows, paymentMethod.id])
        } else {
            showAlert("Delete Payment Method Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Payment Method</h1>
            <p className="popup-content">Do you want to delete this payment method?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeletePaymentMethod