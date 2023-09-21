import { useState } from "react"
import useMailApi from "../../api/useMailApi"
import Editor from "../../layout/Shared/Editor"
import { showAlert } from "../../utils/validator"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"

const EditMailTemplate = ({ template, templates }) => {

    const excludedColumns = ["id", "template", "created_at", "updated_at"]

    const filteredColumns = Object.keys(template).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateTemplate } = useMailApi()
    const [currentTemplate, setCurrentTemplate] = useState(template)
    const [templateContent, setTemplateContent] = useState(template.template)

    const onContentChange = (content) => {
        setTemplateContent(content)
    }

    const updateSpecificTemplate = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-template-input, "
        })

        let templateInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = { template: templateContent }
        templateInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))

        if (! isEmpty(data)) {
            let newTemplate = await updateTemplate(template.id, data)
            if (! isEmpty(newTemplate)) {
                setCurrentTemplate(newTemplate)
                showAlert("Mail template information updated successfully");
            }
        }
    }

    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Mail Template Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                    <th>Attribute Name</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns?.map((column) => (
                        <tr>
                            <td>{ column }</td>
                            <td>{ typeof currentTemplate[column] === "boolean"? currentTemplate[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentTemplate[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-template-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div style={{margin: "70px 0",  fontWeight: "700"}}>
                <div style={{fontSize: "30px", margin: "20px 10px"}}>Template Content</div>
                <Editor onContentChange={onContentChange} initialContent={template.template} templates={templates}/>
            </div>

            <div className="update-role">
                <button className="button" onClick={() => updateSpecificTemplate()}>Update Mail Template</button>
            </div>
        </div>
    )
}

export default EditMailTemplate