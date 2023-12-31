import Input from "../../../layout/Shared/Input"
import Editor from "../../../layout/Shared/Editor"
import useNotificationApi from "../../../api/useNotificationApi"
import { useState } from "react"
import { getElement } from "../../../utils/dom"
import { navigate } from "../../../setup/navigator"
import { showAlert } from "../../../utils/validator"
import { isEmpty } from "../../../utils/helper"

const AddNewNotificationTemplate = ({ handler }) => {
    const { addTemplate } = useNotificationApi()
    const [templateContent, setTemplateContent] = useState("")

    const onContentChange = (content) => {
        setTemplateContent(content)
    }

    const addNewTemplate = async () => {
        const result = await addTemplate({
            name: getElement("add-notification-template-name").value,
            subject: getElement("add-notification-template-subject").value,
            template: templateContent
        })

        if (! isEmpty(result)) {
            navigate("notification-management", "add-notification-sending-name", result, handler)
            showAlert("Notification Template Added Successfully!")
        } else {
            showAlert("Valid Notification Template Information Required")
        }
    }

    return (
        <div id="add-operator-form">
            <h1 style={{marginTop: "-25px"}} className="content-header mb-5">Add New Notification Template</h1>
            <Input id="add-notification-template-name" type="text" icon="fas fa-pen" placeholder="Template Name" validrules="required"/>
            <Input id="add-notification-template-subject" type="text" icon="fas fa-envelope-open-text" placeholder="Notification Subject" validrules="required"/>

            <div style={{margin: "70px 0",  fontWeight: "700"}}>
                <div style={{fontSize: "30px", margin: "20px 10px"}}>Template Content</div>
                <Editor onContentChange={onContentChange} attributesList={handler?.response_attributes?.split(',')}/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewTemplate()}>Add Notification Template</button>
            </div>
        </div>
    )
}

export default AddNewNotificationTemplate