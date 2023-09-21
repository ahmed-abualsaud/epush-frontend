import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { isEmpty } from "../../utils/helper"
import { navigate } from "../../setup/navigator"
import { getFormInputData } from "../../utils/dom"
import { showAlert, validate } from "../../utils/validator"


const AddMessageLanguage = () => {

    const { addMessageLanguage } = useCoreApi()

    const addNewMessageLanguage = async () => {

        if (validate("add-message-language-form")) {

            const messageLanguage = {};
            const input = getFormInputData("add-message-language-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-message-language-", "");
                    messageLanguage[newKey] = input[key];
                }
            }

            const result = await addMessageLanguage(messageLanguage);
            if (! isEmpty(result)) {
                navigate("content", "list-message-languages")
                showAlert("Message Language Added Successfully!")
            } else {
                showAlert("Valid Message Language Information Required")
            }
        }
    }

    return (
        <div id="add-message-language-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message Language</h1>

            <Input id="add-message-language-name" type="text" placeholder="Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-message-language-max_characters_length" type="number" placeholder="Maximum Characters Length" validrules="required">
                <i className="input-icon fas fa-arrow-up-9-1"></i>
            </Input>

            <Input id="add-message-language-split_characters_length" type="number" placeholder="Split Characters Length" validrules="required">
                <i className="input-icon fas fa-arrow-up-9-1"></i>
            </Input>

            <div className="update-user">
                <button className="button" onClick={() => addNewMessageLanguage()}>Add New Message Language</button>
            </div>
        </div>
    )
}

export default AddMessageLanguage