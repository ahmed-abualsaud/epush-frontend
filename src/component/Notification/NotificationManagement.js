import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

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
        <Page className="m-0">
            <NavBar>
                <div onClick={renderSendingNotification}><i className="fas fa-bell"></i>Sending Notification</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="notification-management"></div>

        </Page>
    )
}

export default NotificationManagement