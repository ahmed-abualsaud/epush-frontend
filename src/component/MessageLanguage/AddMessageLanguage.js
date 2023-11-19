import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { isEmpty } from "../../utils/helper"
import { navigate } from "../../setup/navigator"
import { getFormInputData } from "../../utils/dom"
import { showAlert, validate } from "../../utils/validator"
import Page from "../../page/Page"


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
        <Page id="add-message-language-form" title="Add New Message Language">
            <Input id="add-message-language-name" type="text" icon="fas fa-pen" placeholder="Language Name" validrules="required"/>
            <Input id="add-message-language-max_characters_length" type="number" icon="fas fa-arrow-up-9-1" placeholder="Maximum Characters Length" validrules="required"/>
            <Input id="add-message-language-split_characters_length" type="number" icon="fas fa-arrow-up-9-1" placeholder="Split Characters Length" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewMessageLanguage()}>Add Message Language</button>
            </div>
        </Page>
    )
}

export default AddMessageLanguage