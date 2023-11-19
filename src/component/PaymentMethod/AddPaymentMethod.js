import Input from "../../layout/Shared/Input"
import { isEmpty } from "../../utils/helper"
import { navigate } from "../../setup/navigator"
import { getFormInputData } from "../../utils/dom"
import useExpenseApi from "../../api/useExpenseApi"
import { showAlert, validate } from "../../utils/validator"
import Page from "../../page/Page"

const AddPaymentMethod = () => {

    const { addPaymentMethod } = useExpenseApi()

    const addNewPaymentMethod = async () => {

        if (validate("add-payment-method-form")) {

            const paymentMethod = {};
            const input = getFormInputData("add-payment-method-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-payment-method-", "");
                    paymentMethod[newKey] = input[key];
                }
            }

            const result = await addPaymentMethod(paymentMethod);
            if (! isEmpty(result)) {
                navigate("content", "list-payment-methods")
                showAlert("Payment Method Added Successfully!")
            } else {
                showAlert("Valid Payment Method Information Required")
            }
        }
    }

    return (
        <Page id="add-payment-method-form" title="Add New Payment Method">
            <Input id="add-payment-method-name" type="text" icon="fas fa-pen" placeholder="Payment Method Name" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewPaymentMethod()}>Add Payment Method</button>
            </div>
        </Page>
    )
}

export default AddPaymentMethod