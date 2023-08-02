import Button from "../layout/Button"
import '../assets/style/component/add-user-modal.css'
import { navigate } from "../setup/navigator"

const AddUserModal = () => {

    return (
        <div className="add-user-modal-wrapper">
            <a href="#">
                <Button onClick={() => navigate("content", "add-client-user")}>Add Client User</Button>
            </a>
            <a href="#">
                <Button onClick={() => navigate("content", "add-general-user")}>Add General User</Button>
            </a>
        </div>
    )
}

export default AddUserModal