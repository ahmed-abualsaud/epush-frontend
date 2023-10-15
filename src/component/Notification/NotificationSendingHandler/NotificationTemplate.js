import '../../../assets/style/component/notification-template.css';
import { navigate } from '../../../setup/navigator';

const NotificationTemplate = ({ template, handler, deletedRows, setDeletedRows }) => {

    return (
        <div className="notification-template-container">
            <div className="notification-template-header">
                <div className="notification-template-name">{template.name}</div>
                <button 
                    style={{marginLeft: "auto", backgroundColor: "#070020"}} 
                    className="button" 
                    onClick={() => navigate("notification-management", "add-notification-sending-name", template, handler)}
                >Select Template</button>
            </div>
            <a 
                className="notification-template-delete" 
                href="#popup" 
                onClick={() => navigate("modal-content", "delete-notification-template", template, deletedRows, setDeletedRows)}
            ><i className="fas fa-xmark"></i></a>
            <div className="notification-template-subject">Subject: <span style={{display: "inline-block", marginLeft: "10px", color: "#063F30"}}>{template.subject ?? "NULL"}</span></div>
            <div dangerouslySetInnerHTML={{__html: template.template}} className="notification-template-content"></div>
        </div>
    )
}

export default NotificationTemplate