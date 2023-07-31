import Button from "../layout/Button"
import { render } from "../utils/dom"
import AddClientUser from "./AddClientUser"
import AddGeneralUser from "./AddGeneralUser"
import '../assets/style/component/add-user-modal.css'

const AddUserModal = () => {

    return (
        <div className="add-user-modal-wrapper">
            <a href="#">
                <Button onClick={() => render(<AddClientUser/>, "content")}>Add Client User</Button>
            </a>
            <a href="#">
                <Button onClick={() => render(<AddGeneralUser/>, "content")}>Add General User</Button>
            </a>
        </div>
    )
}

export default AddUserModal