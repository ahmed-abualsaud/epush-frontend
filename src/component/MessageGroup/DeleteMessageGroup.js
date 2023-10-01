import useCoreApi from "../../api/useCoreApi";
import { showAlert } from "../../utils/validator";

const DeleteMessageGroup = ({ messageGroup, deletedRows, setDeletedRows }) => {

    const { deleteMessageGroup } = useCoreApi()

    const deleteEntity = async () => {

        if (await deleteMessageGroup(messageGroup.id)) {
            showAlert("Message Group Deleted Successfully")
            setDeletedRows([...deletedRows, messageGroup.id])
        } else {
            showAlert("Delete Message Group Failed")
        }
    }

    return (
        <div>
            <h1 className="delete-header">Delete Message Group</h1>
            <p className="delete-content">Do you want to delete this message group?</p>
            <div className="delete-button-wrapper">
                <a href="#"><button className="button delete-botton" onClick={() => deleteEntity()}>Delete</button></a>
            </div>
        </div>
    )
}

export default DeleteMessageGroup