import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

const ClientMessageManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("client-message-management", "list-client-messages")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderListClientMessages = () => {
        render("client-message-management", "list-client-messages")
    }

    const renderListClientMessageRecipients = () => {
        render("client-message-management", "list-client-message-recipients")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={renderListClientMessages}><i className="fas fa-envelope-open-text"></i>Messages</div>
                <div onClick={renderListClientMessageRecipients}><i class="fas fa-mobile-retro"></i>Recipients</div>
            </NavBar>

            <div id="client-message-management"></div>

        </Page>
    )
}

export default ClientMessageManagement