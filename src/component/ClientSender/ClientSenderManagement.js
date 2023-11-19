import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

const ClientSenderManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("client-sender-management", "list-client-senders")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderClientSenders = () => {
        render("client-sender-management", "list-client-senders")
    }

    const renderClientSenderConnections = () => {
        render("client-sender-management", "list-client-sender-connections")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={renderClientSenders}><i class="fas fa-share-from-square"></i>Senders</div>
                <div onClick={renderClientSenderConnections}><i className="fas fa-tower-cell"></i>Operator</div>
            </NavBar>

            <div id="client-sender-management"></div>

        </Page>
    )
}

export default ClientSenderManagement