import Input from "../../layout/Shared/Input"
import { showAlert, validate } from "../../utils/validator"
import { getElement, getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import useSettingsApi from "../../api/useSettingsApi"
import { useState } from "react"
import DropList from "../../layout/Shared/DropList"
import TextArea from "../../layout/Shared/TextArea"
import Page from "../../page/Page"

const AddSettings = () => {

    const { addSettings } = useSettingsApi()
    const [selectedType, setSelectedType] = useState(null)
    const [description, setDescription] = useState(null)

    const addNewSettings = async () => {

        if (validate("add-settings-form")) {

            const settings = {
                name: getElement("add-settings-name")?.value,
                value: getElement("add-settings-value")?.value,
                type: selectedType,
                description: description
            }            

            const result = await addSettings(settings);
            if (! isEmpty(result)) {
                navigate("content", "list-settings")
                showAlert("Settings Added Successfully!")
            } else {
                showAlert("Valid Settings Information Required")
            }
        }
    }

    const onSelectSettingsType = (option) => {
        setSelectedType(option)
    }

    const onEnteringDescription = (description) => {
        setDescription(description)
    }

    return (
        <Page id="add-settings-form" title="Add New Settings">
            <Input id="add-settings-name" type="text" icon="fas fa-pen" placeholder="Settings Name" validrules="required"/>
            <Input id="add-settings-value" type="text" icon="fas fa-sliders" placeholder="Settings Value" validrules="required"/>

            <div className="m-4">
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Settings Type</div>
                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                    <DropList selectName="Select Settings Type" options={['string', 'integer', 'float', 'boolean', 'character', 'array', 'json', 'object', 'binary']} onSelect={onSelectSettingsType}/>
                </div>
            </div>

            <div className="m-3">
                <TextArea height="300px" placeholder="Enter a Description" onContentChange={onEnteringDescription}/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewSettings()}>Add New Settings</button>
            </div>
        </Page>
    )
}

export default AddSettings