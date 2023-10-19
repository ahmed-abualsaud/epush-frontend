import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

const AddCountry = () => {

    const { addCountry } = useCoreApi()

    const addNewCountry = async () => {

        if (validate("add-country-form")) {

            const priclist = {};
            const input = getFormInputData("add-country-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-country-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addCountry(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-countries")
                showAlert("Country Added Successfully!")
            } else {
                showAlert("Valid Country Information Required")
            }
        }
    }

    return (
        <div id="add-country-form" className="component-container">
            <h1 className="content-header mb-5">Add New Country</h1>

            <Input id="add-country-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-country-code" type="text" placeholder="Code" validrules="required">
                <i className="input-icon fas fa-hashtag"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewCountry()}>Add New Country</button>
            </div>
        </div>
    )
}

export default AddCountry