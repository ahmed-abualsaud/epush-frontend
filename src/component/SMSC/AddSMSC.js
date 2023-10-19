import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"

const AddSMSC = () => {

    const { addSMSC } = useCoreApi()

    const addNewSMSC = async () => {

        if (validate("add-smsc-form")) {

            const priclist = {};
            const input = getFormInputData("add-smsc-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-smsc-", "");
                    priclist[newKey] = input[key];
                }
            }

            const result = await addSMSC(priclist);
            if (! isEmpty(result)) {
                navigate("content", "list-smscs")
                showAlert("SMSC Added Successfully!")
            } else {
                showAlert("Valid SMSC Information Required")
            }
        }
    }

    return (
        <div id="add-smsc-form" className="component-container">
            <h1 className="content-header mb-5">Add New SMSC</h1>

            <Input id="add-smsc-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-smsc-value" type="text" placeholder="Value" validrules="required">
                <i className="input-icon fas fa-plug"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewSMSC()}>Add New SMSC</button>
            </div>
        </div>
    )
}

export default AddSMSC