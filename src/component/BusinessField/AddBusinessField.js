import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

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
        <div id="add-business-field-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Business Field</h1>

            <Input id="add-business-field-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="update-user">
                <button className="button" onClick={() => addNewBusinessField()}>Add New Business Field</button>
            </div>
        </div>
    )
}

export default AddBusinessField