import Input from "../../../layout/Shared/Input"
import Editor from "../../../layout/Shared/Editor"
import useMailApi from "../../../api/useMailApi"
import { useState } from "react"
import { getElement } from "../../../utils/dom"
import { navigate } from "../../../setup/navigator"
import { showAlert } from "../../../utils/validator"
import { isEmpty } from "../../../utils/helper"

const AddMailTemplate = ({ templates }) => {

    const { addTemplate } = useMailApi()
    const [templateContent, setTemplateContent] = useState("")

    const onContentChange = (content) => {
        setTemplateContent(content)
    }

    const addNewTemplate = async () => {
        const result = await addTemplate({
            name: getElement("add-mail-template-name").value,
            subject: getElement("add-mail-template-subject").value,
            template: templateContent
        })

        if (! isEmpty(result)) {
            navigate("mail-management", "list-mail-templates")
            showAlert("Mail Template Added Successfully!")
        } else {
            showAlert("Valid Mail Template Information Required")
        }
    }

    return (
        <div id="add-operator-form">
            <h1 style={{marginTop: "-25px"}} className="content-header mb-5">Add New Mail Template</h1>
            <Input id="add-mail-template-name" type="text" icon="fas fa-pen" placeholder="Template Name" validrules="required"/>
            <Input id="add-mail-template-subject" type="text" icon="fas fa-envelope-open-text" placeholder="Mail Subject" validrules="required"/>

            <div style={{margin: "70px 0",  fontWeight: "700"}}>
                <div style={{fontSize: "30px", margin: "20px 10px"}}>Template Content</div>
                <Editor onContentChange={onContentChange} templates={templates}/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewTemplate()}>Add Mail Template</button>
            </div>
        </div>
    )
}

export default AddMailTemplate