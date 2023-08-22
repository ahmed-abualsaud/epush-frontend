import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteCountry = ({ country, deletedRows, setDeletedRows }) => {

    const { deleteCountry } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteCountry(country.id)) {
            showAlert("Country Deleted Successfully")
            setDeletedRows([...deletedRows, country.id])
        } else {
            showAlert("Delete Country Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Country</h1>
            <p className="delete-content">Do you want to delete this country?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteCountry