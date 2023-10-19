import { useEffect, useRef, useState } from "react"
import useNotificationApi from "../../../api/useNotificationApi"
import { navigate } from "../../../setup/navigator"
import NotificationTemplate from "./NotificationTemplate"

const AddNotificationSendingTemplate = ({ handler }) => {

    const { listTemplates } = useNotificationApi()

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
                Select One of The System Notification Templates
                <button 
                    style={{
                        marginLeft: "auto", 
                        backgroundColor: "#070020", 
                        backgroundImage: "none"
                    }} 
                    className="button" 
                    onClick={() => navigate("notification-management", "add-new-notification-template", handler)}
                >
                    Add New Notification Template
                </button>
            </h1>

            {templates.map(template =>  (
                ! deletedRows.includes(template.id) &&
                <NotificationTemplate 
                    template={template}
                    handler={handler}
                    deletedRows={deletedRows} 
                    setDeletedRows={setDeletedRows}
                />
            ))}
        </div>
    )
}

export default AddNotificationSendingTemplate