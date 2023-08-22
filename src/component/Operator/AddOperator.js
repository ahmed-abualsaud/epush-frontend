import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

const AddOperator = () => {

    const { addOperator } = useCoreApi()

    const addNewOperator = async () => {

        if (validate("add-operator-form")) {

            const priclist = {};
            const input = getFormInputData("add-operator-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-operator-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addOperator(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-operators")
                showAlert("Operator Added Successfully!")
            } else {
                showAlert("Valid Operator Information Required")
            }
        }
    }

    return (
        <div id="add-operator-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Operator</h1>

            <Input id="add-operator-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-operator-code" type="text" placeholder="Code" validrules="required">
                <i className="input-icon fas fa-hashtag"></i>
            </Input>

            <div className="update-user">
                <button className="button" onClick={() => addNewOperator()}>Add New Operator</button>
            </div>
        </div>
    )
}

export default AddOperator