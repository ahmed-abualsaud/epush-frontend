import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const MailManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("mail-management", "list-mail-sending-handlers")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderSendingMail = () => {
        render("mail-management", "list-mail-sending-handlers")
    }

    const renderMailTemplates = () => {
        render("mail-management", "list-mail-templates")
    }

    return (
        <div className="component-container">
            <NavBar>
                <div onClick={renderSendingMail}><i class="fas fa-envelope"></i>Sending Mail</div>
                <div onClick={renderMailTemplates}><i className="far fa-rectangle-list"></i>Mail Templates</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="mail-management"></div>

        </div>
    )
}

export default MailManagement