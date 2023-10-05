import Header from "../layout/Shared/Header"
import Sidebar from "../layout/Navigation/Sidebar"
import Content from "../layout/Shared/Content"
import NavItem from "../layout/Navigation/NavItem"
import NavItems from "../layout/Navigation/NavItems"
import Dashboard from "../layout/Shared/Dashboard"
import ProfileNav from "../component/Header/ProfileNav"
import TableContent from "../layout/Shared/TableContent"
import { addRoute, navigate } from "../setup/navigator"
import ListUsers from "../component/User/ListUsers"
import { useEffect, useRef } from "react"

const AdminDashboard = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        addRoute("content", "list-users", [])
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
                <NavItem
                    text="Authorization"
                    icon="fas fa-user-shield"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Users" icon="fas fa-users" onClick={ () => navigate("content", "list-users") }/>
                        <NavItem text="Roles" icon="fas fa-person-circle-check" onClick={ () => navigate("content", "list-roles") }/>
                        <NavItem text="Permissions" icon="fas uil-shield-check" onClick={ () => navigate("content", "list-permissions") }/>
                    </NavItems>
                </NavItem>

                <NavItem text="Sales" icon="fas fa-hand-holding-dollar" onClick={ () => navigate("content", "list-sales") }/>
                <NavItem text="Price List" icon="fas fa-receipt" onClick={ () => navigate("content", "list-pricelist") }/>
                <NavItem text="Business Fields" icon="fas fa-industry" onClick={ () => navigate("content", "list-business-fields") }/>

                <NavItem
                    text="Expense"
                    icon="fas fa-sack-dollar"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Payment Methods" icon="fas fa-credit-card" onClick={ () => navigate("content", "list-payment-methods") }/>
                        <NavItem text="Orders" icon="fas fa-money-bill-transfer" onClick={ () => navigate("content", "list-orders") }/>
                    </NavItems>
                </NavItem>

                <NavItem text="Countries" icon="fas fa-earth-americas" onClick={ () => navigate("content", "list-countries") }/>
                <NavItem text="Operators" icon="fas fa-tower-cell" onClick={ () => navigate("content", "list-operators") }/>

                <NavItem
                    text="SMSCs Management"
                    icon="fas fa-circle-nodes"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="SMS Connections" icon="fas fa-plug" onClick={ () => navigate("content", "list-smscs") }/>
                        <NavItem text="Connections Bindings" icon="fas fa-circle-nodes" onClick={ () => navigate("content", "list-smsc-bindings") }/>
                    </NavItems>
                </NavItem>

                <NavItem
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
                    text="SMS Management" 
                    icon="fas fa-comment-sms" 
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Messages" icon="fas fa-envelope-open-text" onClick={ () => navigate("content", "list-messages") }/>
                        <NavItem text="Unapproved Messages" icon="fas fa-comment-slash" onClick={ () => navigate("content", "list-approved-messages") }/>
                        <NavItem text="Message Groups" icon="fas fa-users-rectangle" onClick={ () => navigate("content", "list-message-groups") }/>
                        <NavItem text="Group Recipients" icon="fas fa-arrows-down-to-people" onClick={ () => navigate("content", "list-message-group-recipients") }/>
                        <NavItem text="Message Languages" icon="fas fa-language" onClick={ () => navigate("content", "list-message-languages") }/>
                        <NavItem text="Message Segments" icon="fas fa-comments" onClick={ () => navigate("content", "list-message-segments") }/>
                        <NavItem text="Message Recipients" icon="fas fa-mobile-retro" onClick={ () => navigate("content", "list-message-recipients") }/>
                    </NavItems>
                </NavItem>

            </Sidebar>

            <Content>
                <TableContent tab="all">
                    <ListUsers/>
                </TableContent>
            </Content>
        </Dashboard>
    )
}

export default AdminDashboard