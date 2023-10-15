import '../../../assets/style/component/sms-template.css';
import { navigate } from '../../../setup/navigator';

const SMSTemplate = ({ template, handler, deletedRows, setDeletedRows }) => {

    return (
        <div className="sms-template-container">
            <div className="sms-template-header">
                <div className="sms-template-name">{template.name}</div>
                <button 
                    style={{marginLeft: "auto", backgroundColor: "#070020"}} 
                    className="button" 
                    onClick={() => navigate("sms-management", "add-sms-sending-name", template, handler)}
                >Select Template</button>
                <a 
                    className="sms-template-delete" 
                    href="#popup" 
                    onClick={() => navigate("modal-content", "delete-sms-template", template, deletedRows, setDeletedRows)}
                ><i className="fas fa-xmark"></i></a>
            </div>
            <div className="sms-template-subject">Subject: <span style={{display: "inline-block", marginLeft: "10px", color: "#063F30"}}>{template.subject ?? "NULL"}</span></div>
            <div dangerouslySetInnerHTML={{__html: template.template}} className="sms-template-content"></div>
        </div>
    )
}

export default SMSTemplate