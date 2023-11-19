import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

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
        <Page id="add-sales-form" title="Add New Sales">
            <Input id="add-sales-name" type="text" icon="fas fa-pen" placeholder="Sales Name" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewSales()}>Add New Sales</button>
            </div>
        </Page>
    )
}

export default AddSales