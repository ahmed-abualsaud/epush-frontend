import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const NotificationManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("notification-management", "list-notification-sending-handlers")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderSendingNotification = () => {
        render("notification-management", "list-notification-sending-handlers")
    }

    return (
        <div className="add-user-container">
            <NavBar>
                <div onClick={renderSendingNotification}><i className="fas fa-bell"></i>Sending Notification</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="notification-management"></div>

        </div>
    )
}

export default NotificationManagement