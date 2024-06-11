import Header from "../../layout/Shared/Header"
import Sidebar from "../../layout/Navigation/Sidebar"
import Content from "../../layout/Shared/Content"
import NavItem from "../../layout/Navigation/NavItem"
import NavItems from "../../layout/Navigation/NavItems"
import Dashboard from "../../layout/Shared/Dashboard"
import ProfileNav from "../../component/Header/ProfileNav"
import { addRoute, navigate } from "../../setup/navigator"
import { useEffect, useRef } from "react"
import useAuthApi from "../../api/useAuthApi"
import { useSelector } from "react-redux"
import Notification from "../../layout/Shared/Notification"
import ListClients from "../../component/Client/ListClients"

const PartnerDashboard = () => {

    const { signout } = useAuthApi()
    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        addRoute("content", "list-clients", [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const handleClick = (e) => {
        e.stopPropagation()
        e.currentTarget.style.backgroundColor = "#070020"
        e.currentTarget.firstElementChild.nextElementSibling.classList.add("nav-flyin")
    }

    const handleLeave = (e) => {
        e.stopPropagation()
        e.currentTarget.style.backgroundColor = "transparent"
        e.currentTarget.firstElementChild.nextElementSibling.classList.remove("nav-flyin")
        e.currentTarget.firstElementChild.nextElementSibling.classList.add("nav-flyout")
    }


    return (
        <Dashboard>
            <Header>
                <ProfileNav />
            </Header>

            <Sidebar>
                <NavItem text="Profile" icon="fas fa-id-card" onClick={ () => navigate("content", "profile", user?.user, user?.roles[0]?.name) }/>
                <NavItem text="Clients" icon="fas fa-users" onClick={ () => navigate("content", "list-clients") }/>

                {/* <NavItem 
                    text="SMS Management" 
                    icon="fas fa-comment-sms" 
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout"> */}
                        <NavItem text="Sent Messages" icon="fas fa-envelope-open-text" onClick={ () => navigate("content", "list-messages") }/>
                        <NavItem text="Scheduled Messages" icon="fas fa-calendar-days" onClick={ () => navigate("content", "list-scheduled-messages") }/>
                        <NavItem text="Unapproved Messages" icon="fas fa-comment-slash" onClick={ () => navigate("content", "list-unapproved-messages") }/>
                        <NavItem text="Message Groups" icon="fas fa-users-rectangle" onClick={ () => navigate("content", "list-message-groups") }/>
                        <NavItem text="Group Recipients" icon="fas fa-arrows-down-to-people" onClick={ () => navigate("content", "list-message-group-recipients") }/>
                        <NavItem text="Message Languages" icon="fas fa-language" onClick={ () => navigate("content", "list-message-languages") }/>
                        <NavItem text="Message Segments" icon="fas fa-comments" onClick={ () => navigate("content", "list-message-segments") }/>
                        <NavItem text="Message Recipients" icon="fas fa-mobile-retro" onClick={ () => navigate("content", "list-message-recipients") }/>
                    {/* </NavItems>
                </NavItem> */}

                {/* <NavItem
                    text="Senders Management"
                    icon="fas fa-share-from-square"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Senders" icon="fas fa-share-from-square" onClick={ () => navigate("content", "list-senders") }/>
                        <NavItem text="Senders Connections" icon="fas fa-tower-broadcast" onClick={ () => navigate("content", "list-senders-connections") }/>
                    </NavItems>
                </NavItem>

                <NavItem
                    text="Expense"
                    icon="fas fa-sack-dollar"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout"> */}
                        {/* <NavItem text="Payment Methods" icon="fas fa-credit-card" onClick={ () => navigate("content", "list-payment-methods") }/> */}
                        <NavItem text="Orders" icon="fas fa-money-bill-transfer" onClick={ () => navigate("content", "list-orders") }/>
                    {/* </NavItems>
                </NavItem>

                <NavItem text="Sales" icon="fas fa-hand-holding-dollar" onClick={ () => navigate("content", "list-sales") }/>
                <NavItem text="Price List" icon="fas fa-receipt" onClick={ () => navigate("content", "list-pricelist") }/>
                <NavItem text="Business Fields" icon="fas fa-chart-column" onClick={ () => navigate("content", "list-business-fields") }/> */}
                {/* <NavItem text="Tickets" icon="fas fa-ticket" onClick={ () => navigate("content", "list-tickets") }/> */}

                <NavItem text="Logout" icon="fas fa-right-from-bracket" onClick={ () => signout() }/>

            </Sidebar>

            <Content>
                <ListClients/>
            </Content>
            <Notification/>
        </Dashboard>
    )
}

export default PartnerDashboard