import { useEffect, useRef, useState } from "react"
import useMailApi from "../../../api/useMailApi"
import { navigate } from "../../../setup/navigator"
import MailTemplate from "./MailTemplate"

const AddMailSendingTemplate = ({ handler }) => {

    const { listTemplates } = useMailApi()

    const [templates, setTemplates] = useState([])
    const [deletedRows, setDeletedRows] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        const tpl = await listTemplates()
        if (tpl) {
            setTemplates(tpl)
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    return (
        <div>
            <h1 style={{marginTop: "-25px"}} className="content-header">
                Select One of The System Mail Templates
                <button 
                    style={{
                        marginLeft: "auto", 
                        backgroundColor: "#070020", 
                        backgroundImage: "none"
                    }} 
                    className="button" 
                    onClick={() => navigate("mail-management", "add-new-mail-template", handler)}
                >
                    Add New Mail Template
                </button>
            </h1>

            {templates.map(template =>  (
                ! deletedRows.includes(template.id) &&
                <MailTemplate 
                    template={template}
                    handler={handler}
                    onDelete={() => setDeletedRows([...deletedRows, template.id])}
                />
            ))}
        </div>
    )
}

export default AddMailSendingTemplate