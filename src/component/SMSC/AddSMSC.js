import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"

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
        <Page id="add-smsc-form" title="Add New SMSC">
            <Input id="add-smsc-name" type="text" icon="fas fa-pen" placeholder="SMS Connection Name" validrules="required"/>
            <Input id="add-smsc-value" type="text" icon="fas fa-plug" placeholder="SMS Connection Value" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewSMSC()}>Add New SMSC</button>
            </div>
        </Page>
    )
}

export default AddSMSC