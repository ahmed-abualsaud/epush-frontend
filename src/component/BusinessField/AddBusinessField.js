import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

const AddBusinessField = () => {

    const { addBusinessField } = useCoreApi()

    const addNewBusinessField = async () => {

        if (validate("add-business-field-form")) {

            const priclist = {};
            const input = getFormInputData("add-business-field-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-business-field-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addBusinessField(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-business-fields")
                showAlert("Business Field Added Successfully!")
            } else {
                showAlert("Valid Business Field Information Required")
            }
        }
    }

    return (
        <Page id="add-business-field-form" title="Add New Business Field">
            <Input id="add-business-field-name" icon="fas fa-pen" type="text" placeholder="Business Field Name" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewBusinessField()}>Add New Business Field</button>
            </div>
        </Page>
    )
}

export default AddBusinessField