import { showAlert } from '../../utils/validator'
import useCoreApi from '../../api/useCoreApi'

const DeletePartner = ({ partner, onDelete }) => {

    const { deletePartner } = useCoreApi()

    const deleteEntity = async () => {

        if (await deletePartner(partner.user_id)) {
            onDelete()
            showAlert("Partner Deleted Successfully")
        } else {
            showAlert("Delete Partner Failed")
        }
    }

    return (
        <div>
            <h1 className="popup-header">Delete Partner</h1>
            <p className="popup-content">Do you want to delete this partner?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )

}

export default DeletePartner