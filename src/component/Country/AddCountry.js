import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

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
        <Page id="add-country-form" title="Add New Country">
            <Input id="add-country-name" type="text" icon="fas fa-pen" placeholder="Country Name" validrules="required"/>
            <Input id="add-country-code" type="text" icon="fas fa-hashtag" placeholder="Country Code" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewCountry()}>Add New Country</button>
            </div>
        </Page>
    )
}

export default AddCountry