import { useEffect, useRef, useState } from "react"
import useSMSApi from "../../../api/useSMSApi"
import { navigate } from "../../../setup/navigator"
import SMSTemplate from "./SMSTemplate"

const AddSMSSendingTemplate = ({ handler }) => {

    const { listTemplates } = useSMSApi()

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
        <div className="component-container">
            <h1 className="content-header">
                Select One of The System SMS Templates
                <button 
                    style={{
                        marginLeft: "auto", 
                        backgroundColor: "#070020", 
                        backgroundImage: "none"
                    }} 
                    className="button" 
                    onClick={() => navigate("sms-management", "add-new-sms-template", handler)}
                >
                    Add New SMS Template
                </button>
            </h1>

            {templates.map(template =>  (
                ! deletedRows.includes(template.id) &&
                <SMSTemplate 
                    template={template}
                    handler={handler}
                    deletedRows={deletedRows} 
                    setDeletedRows={setDeletedRows}
                />
            ))}
        </div>
    )
}

export default AddSMSSendingTemplate