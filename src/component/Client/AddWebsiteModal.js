import '../../assets/style/component/add-website-modal.css'

import { getElement } from '../../utils/dom'
import Button from "../../layout/Shared/Button"

const AddWebsiteModal = ({ addClientWebsite }) => {

    const addWebsite = () => {
        addClientWebsite(getElement("new-client-website").value)
    }

    return (
        <div className="add-website-modal-container">
            <div className="add-website-modal">
                <input id="new-client-website" className="add-website-input" type="text" placeholder="Add Website" />
                <a href="#"><Button onClick={addWebsite} className="button add-website-button">Add</Button></a>
            </div>
        </div>
    )
}

export default AddWebsiteModal