import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

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
        <div id="add-pricelist-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Price</h1>

            <Input id="add-pricelist-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-pricelist-price" type="text" placeholder="Price" validrules="required">
                <i className="input-icon uil uil-dollar-sign"></i>
            </Input>

            <div className="update-user">
                <button className="button" onClick={() => addNewPricelist()}>Add New Price</button>
            </div>
        </div>
    )
}

export default AddPricelist