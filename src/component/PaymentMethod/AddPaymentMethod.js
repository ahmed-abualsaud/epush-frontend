import Input from "../../layout/Shared/Input"
import { isEmpty } from "../../utils/helper"
import { navigate } from "../../setup/navigator"
import { getFormInputData } from "../../utils/dom"
import useExpenseApi from "../../api/useExpenseApi"
import { showAlert, validate } from "../../utils/validator"

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
        <div id="add-payment-method-form" className="component-container">
            <h1 className="content-header mb-5">Add New Payment Method</h1>

            <Input id="add-payment-method-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewPaymentMethod()}>Add Payment Method</button>
            </div>
        </div>
    )
}

export default AddPaymentMethod