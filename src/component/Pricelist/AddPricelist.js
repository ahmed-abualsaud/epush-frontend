import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

const AddPricelist = () => {

    const { addPricelist } = useCoreApi()

    const addNewPricelist = async () => {

        if (validate("add-pricelist-form")) {

            const priclist = {};
            const input = getFormInputData("add-pricelist-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-pricelist-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addPricelist(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-pricelist")
                showAlert("Pricelist Added Successfully!")
            } else {
                showAlert("Valid Pricelist Information Required")
            }
        }
    }

    return (
        <Page id="add-pricelist-form" title="Add New Price">
            <Input id="add-pricelist-name" type="text" icon="fas fa-pen" placeholder="Name" validrules="required"/>
            <Input id="add-pricelist-price" type="text" icon="uil uil-dollar-sign" placeholder="Price" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewPricelist()}>Add New Price</button>
            </div>
        </Page>
    )
}

export default AddPricelist