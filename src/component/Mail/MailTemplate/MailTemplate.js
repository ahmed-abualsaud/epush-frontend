import '../../../assets/style/component/mail-template.css';
import { navigate } from '../../../setup/navigator';

const MailTemplate = ({ template, deletedRows, setDeletedRows, templates }) => {

    return (
        <div className="mail-template-container">
            <div className="mail-template-header">
                <div className="mail-template-name">{template.name}</div>
                <button 
                    style={{marginLeft: "auto", backgroundColor: "#070020"}} 
                    className="button" 
                    onClick={() => navigate("content", "edit-mail-template", template, templates)}
                >Edit Template</button>

                <a 
                    className="mail-template-delete" 
                    href="#popup" 
                    onClick={() => navigate("modal-content", "delete-mail-template", template, deletedRows, setDeletedRows)}
                ><i className="fas fa-xmark"></i></a>
            </div>
            <div className="mail-template-subject">Subject: <span style={{display: "inline-block", marginLeft: "10px", color: "#063F30"}}>{template.subject}</span></div>
            <div dangerouslySetInnerHTML={{__html: template.template}} className="mail-template-content"></div>
        </div>
    )
}

export default MailTemplate