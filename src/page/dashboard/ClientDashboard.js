import { useEffect, useRef } from "react"
import NavItem from "../../layout/Navigation/NavItem"
import Dashboard from "../../layout/Shared/Dashboard"
import { addRoute, navigate } from "../../setup/navigator"
import Sidebar from "../../layout/Navigation/Sidebar"
import Header from "../../layout/Shared/Header"
import ProfileNav from "../../component/Header/ProfileNav"
import Content from "../../layout/Shared/Content"
import ClientProfile from "../../component/Client/ClientProfile"
import useAuthApi from "../../api/useAuthApi"
import Notification from "../../layout/Shared/Notification"

const ClientDashboard = () => {

    const { signout } = useAuthApi()

    const setupLock = useRef(true)
    const setup = async () => {
        addRoute("content", "client-profile", [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    return (
        <Dashboard>
             <Header>
                <ProfileNav/>
            </Header>

            <Sidebar>
                <NavItem text="Profile" icon="fas fa-id-card" onClick={ () => navigate("content", "client-profile") }/>
                <NavItem text="API" icon="fas fa-code" onClick={ () => navigate("content", "api") }/>
                <NavItem text="Send Message" icon="fas fa-paper-plane" onClick={ () => navigate("content", "add-client-message") }/>
                <NavItem text="Report" icon="fas fa-envelope-open-text" onClick={ () => navigate("content", "client-message-management") }/>
                <NavItem text="Scheduled" icon="fas fa-calendar-days" onClick={ () => navigate("content", "list-client-scheduled-messages") }/>
                <NavItem text="Groups" icon="fas fa-users-rectangle" onClick={ () => navigate("content", "list-client-message-groups") }/>
                <NavItem text="Senders & Connections" icon="fas fa-share-from-square" onClick={ () => navigate("content", "client-sender-management") }/>
                <NavItem text="Add Sender" icon="fas fa-comment-medical" onClick={ () => navigate("content", "add-client-sender") }/>
                <NavItem text="Documents" icon="fas fa-folder-tree" onClick={ () => navigate("content", "client-file-management") }/>
                <NavItem text="Complaints" icon="fas fa-box-tissue" onClick={ () => navigate("content", "client-ticket-management") }/>
                <NavItem text="Logout" icon="fas fa-right-from-bracket" onClick={ () => signout() }/>
            </Sidebar>

            <Content>
                <ClientProfile/>
            </Content>
            <Notification/>
        </Dashboard>
    )
}

export default ClientDashboard