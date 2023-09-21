import { useEffect, useRef, useState } from "react"
import useMailApi from "../../api/useMailApi"
import { navigate } from "../../setup/navigator"
import MailTemplate from "./MailTemplate"

const ListMailTemplates = () => {

    const { listTemplates } = useMailApi()

    const [templates, setTemplates] = useState([])
    const [deletedRows, setDeletedRows] = useState([])
    const [templatesList, setTemplatesList] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        const tpl = await listTemplates()
        if (tpl) {
            setTemplates(tpl)
            setTemplatesList(tpl.map(template => ({name: template.name, html: template.template})))
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    return (
        <div className="add-user-container">
            <h1 className="add-user-header">
                All Mail Templates
                <button 
                    style={{
                        marginLeft: "auto", 
                        backgroundColor: "#070020", 
                        backgroundImage: "none"
                    }} 
                    className="button" 
                    onClick={() => navigate("content", "add-mail-template", templatesList)}
                >
                    Add New Mail Template
                </button>
            </h1>

            {templates.map(template =>  (
                ! deletedRows.includes(template.id) &&
                <MailTemplate 
                    template={template} 
                    deletedRows={deletedRows} 
                    setDeletedRows={setDeletedRows} 
                    templates={templatesList}/>
            ))}
        </div>
    )
}

export default ListMailTemplates