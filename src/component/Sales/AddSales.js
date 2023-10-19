import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

const AddSales = () => {

    const { addSales } = useCoreApi()

    const addNewSales = async () => {

        if (validate("add-sales-form")) {

            const priclist = {};
            const input = getFormInputData("add-sales-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-sales-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addSales(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-sales")
                showAlert("Sales Added Successfully!")
            } else {
                showAlert("Valid Sales Information Required")
            }
        }
    }

    return (
        <div id="add-sales-form" className="component-container">
            <h1 className="content-header mb-5">Add New Sales</h1>

            <Input id="add-sales-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewSales()}>Add New Sales</button>
            </div>
        </div>
    )
}

export default AddSales