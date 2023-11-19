import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

const AddOperator = () => {

    const { addOperator } = useCoreApi()

    const addNewOperator = async () => {

        if (validate("add-operator-form")) {

            const operator = {};
            const input = getFormInputData("add-operator-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-operator-", "");
                    operator[newKey] = input[key];
                }
            }

            const result = await addOperator(operator);
            if (! isEmpty(result)) {
                navigate("content", "list-operators")
                showAlert("Operator Added Successfully!")
            } else {
                showAlert("Valid Operator Information Required")
            }
        }
    }

    return (
        <Page id="add-operator-form" title="Add New Operator">
            <Input id="add-operator-name" type="text" icon="fas fa-pen" placeholder="Operator Name" validrules="required"/>
            <Input id="add-operator-code" type="text" icon="fas fa-hashtag" placeholder="Operator Code" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewOperator()}>Add New Operator</button>
            </div>
        </Page>
    )
}

export default AddOperator