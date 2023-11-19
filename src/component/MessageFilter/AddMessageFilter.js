import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getElement, getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

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
        <Page id="add-message-filter-form" title="Add New Message Filter">
            <Input id="add-message-filter-name" type="text" icon="fas fa-pen" placeholder="Word Name" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewMessageFilter()}>Add New Message Filter</button>
            </div>
        </Page>
    )
}

export default AddMessageFilter