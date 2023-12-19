import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

const ClientTicketManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("client-ticket-management", "add-ticket")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderAddClientTickets = () => {
        render("client-ticket-management", "add-ticket")
    }

    const renderListClientTickets = () => {
        render("client-ticket-management", "list-client-tickets")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={renderAddClientTickets}><i class="fas fa-truck-medical"></i>Contact Us</div>
                <div onClick={renderListClientTickets}><i className="fas fa-ticket"></i>My Complaints</div>
            </NavBar>

            <div id="client-ticket-management"></div>

        </Page>
    )
}

export default ClientTicketManagement