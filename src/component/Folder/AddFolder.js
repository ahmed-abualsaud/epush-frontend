import Page from "../../page/Page"
import Input from "../../layout/Shared/Input"
import { showAlert, validate } from "../../utils/validator"
import { getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import useFileApi from "../../api/useFileApi"

const AddFolder = () => {

    const { addFolder } = useFileApi()

    const addNewFolder = async () => {

        if (validate("add-folder-form")) {

            const folder = {};
            const input = getFormInputData("add-folder-form")
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    const newKey = key.replace("add-folder-", "");
                    folder[newKey] = input[key];
                }
            }

            const result = await addFolder(folder);
            if (! isEmpty(result)) {
                navigate("content", "list-folders")
                showAlert("Folder Added Successfully!")
            } else {
                showAlert("Valid Folder Information Required")
            }
        }
    }

    return (
        <Page id="add-folder-form" title="Add New Folder">
            <Input id="add-folder-name" type="text" icon="fas fa-folder-open" placeholder="Folder Name" validrules="required"/>
            <Input id="add-folder-description" type="text" icon="fas fa-note-sticky" placeholder="Folder Description" validrules="required"/>

            <div className="button-container">
                <button className="button" onClick={() => addNewFolder()}>Add New Folder</button>
            </div>
        </Page>
    )
}

export default AddFolder