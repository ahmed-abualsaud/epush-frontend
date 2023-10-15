import Input from "../../../layout/Shared/Input"
import Editor from "../../../layout/Shared/Editor"
import useSMSApi from "../../../api/useSMSApi"
import { useState } from "react"
import { getElement } from "../../../utils/dom"
import { navigate } from "../../../setup/navigator"
import { showAlert } from "../../../utils/validator"
import { isEmpty } from "../../../utils/helper"

const AddNewSMSTemplate = ({ handler }) => {
    const { addTemplate } = useSMSApi()
    const [templateContent, setTemplateContent] = useState("")

    const onContentChange = (content) => {
        setTemplateContent(content)
    }

    const addNewTemplate = async () => {
        const result = await addTemplate({
            name: getElement("add-sms-template-name").value,
            subject: getElement("add-sms-template-subject").value,
            template: templateContent
        })

        if (! isEmpty(result)) {
            navigate("sms-management", "add-sms-sending-name", result, handler)
            showAlert("SMS Template Added Successfully!")
        } else {
            showAlert("Valid SMS Template Information Required")
        }
    }

    return (
        <div id="add-operator-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New SMS Template</h1>
            <Input id="add-sms-template-name" type="text" placeholder="Template Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <Input id="add-sms-template-subject" type="text" placeholder="SMS Subject" validrules="required">
                <i class="input-icon fas fa-envelope-open-text"></i>
            </Input>

            <div style={{margin: "70px 0",  fontWeight: "700"}}>
                <div style={{fontSize: "30px", margin: "20px 10px"}}>Template Content</div>
                <Editor onContentChange={onContentChange} attributesList={handler?.response_attributes?.split(',')}/>
            </div>

            <div className="update-user">
                <button className="button" onClick={() => addNewTemplate()}>Add SMS Template</button>
            </div>
        </div>
    )
}

export default AddNewSMSTemplate