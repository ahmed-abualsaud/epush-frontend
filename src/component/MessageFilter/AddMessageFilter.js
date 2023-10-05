import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getElement, getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

const AddMessageFilter = () => {

    const { addMessageFilter } = useCoreApi()

    const addNewMessageFilter = async () => {

        if (validate("add-message-filter-form")) {

            const messagefilter = {
                name: getElement("add-message-filter-name").value
            }

            const result = await addMessageFilter(messagefilter);
            if (! isEmpty(result)) {
                navigate("content", "list-message-filters")
                showAlert("Message Filter Added Successfully!")
            } else {
                showAlert("Valid Message Filter Information Required")
            }
        }
    }

    return (
        <div id="add-message-filter-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message Filter</h1>

            <Input id="add-message-filter-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="update-user">
                <button className="button" onClick={() => addNewMessageFilter()}>Add New Message Filter</button>
            </div>
        </div>
    )
}

export default AddMessageFilter