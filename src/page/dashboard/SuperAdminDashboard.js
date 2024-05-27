import Header from "../../layout/Shared/Header"
import useOrchiApi from "../../api/useOrchiApi"
import Content from "../../layout/Shared/Content"
import Sidebar from "../../layout/Navigation/Sidebar"
import NavItem from "../../layout/Navigation/NavItem"
import Dashboard from "../../layout/Shared/Dashboard"
import NavItems from "../../layout/Navigation/NavItems"
import ProfileNav from "../../component/Header/ProfileNav"

import { addRoute, navigate } from "../../setup/navigator"
import React, { useEffect, useRef, useState } from "react"
import Notification from "../../layout/Shared/Notification"
import useAuthApi from "../../api/useAuthApi"
import { useSelector } from "react-redux"
import TopNav from "../../layout/Shared/TopNav"

const SuperAdminDashboard = () => {

    const { signout } = useAuthApi()
    const { listServices } = useOrchiApi()
    const [services, setServices] = useState([])
    const user = useSelector(state => state.auth.user)


    const setupLock = useRef(true)
    const setup = async () => {
        const srv = await listServices()
        if (srv) setServices(srv)
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
                <NavItem text="Profile" icon="fas fa-id-card" onClick={ () => navigate("content", "profile", user?.user, user?.roles[0]?.name) }/>

                <NavItem
                    text="Services"
                    icon="fas fa-box-open"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem 
                            key="all"
                            text="All"
                            icon="fas fa-table-list"
                            onClick={() => navigate("content", "all-services", services)}
                        />
                        {services.map((service) => (
                            <NavItem 
                                key={service.id} 
                                text={service.name.charAt(0).toUpperCase() + service.name.slice(1)} 
                                icon={ 
                                    service.name === "auth" ? "fas fa-lock" : 
                                    service.name === "file" ? "fas fa-file-alt" : 
                                    service.name === "core" ? "fas fa-atom" : 
                                    service.name === "mail" ? "fas fa-envelope" : 
                                    service.name === "sms" ? "fas fa-sms" : 
                                    service.name === "settings" ? "fas fa-gears" : 
                                    service.name === "expense" ? "fas fa-sack-dollar" : 
                                    service.name === "notification" ? "fas fa-bell" :
                                    service.name === "search" ? "fab fa-searchengin" :
                                    "fas fa-ticket"
                                }
                                onClick={() => navigate("content", "service-contexts", service)}
                            />
                        ))}
                    </NavItems>
                </NavItem>

                <NavItem
                    text="Syetem Management"
                    icon="fas fa-sliders"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Settings" icon="fas fa-gear" onClick={ () => navigate("content", "list-settings") }/>
                        <NavItem text="Mail" icon="fas fa-envelope" onClick={ () => navigate("content", "mail-management") }/>
                        <NavItem text="SMS" icon="fas fa-comment-sms" onClick={ () => navigate("content", "sms-management") }/>
                        <NavItem text="Notification" icon="fas fa-bell" onClick={ () => navigate("content", "notification-management") }/>
                        <NavItem text="Queue" icon="fas fa-layer-group" onClick={ () => navigate("content", "queue-management") }/>
                        <NavItem text="Documents" icon="fas fa-folder-tree" onClick={ () => navigate("content", "list-folders") }/>
                        <NavItem text="Announcements" icon="fas fa-bullhorn" onClick={ () => navigate("content", "list-banners") }/>
                    </NavItems>
                </NavItem>

                <NavItem
                    text="Authorization"
                    icon="fas fa-user-shield"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Users" icon="fas fa-users" onClick={ () => navigate("content", "top-nav") }/>
                        <NavItem text="Roles" icon="fas fa-person-circle-check" onClick={ () => navigate("content", "list-roles") }/>
                        <NavItem text="Permissions" icon="uil uil-shield-check" onClick={ () => navigate("content", "list-permissions") }/>
                    </NavItems>
                </NavItem>

                <NavItem 
                    text="SMS Management" 
                    icon="fas fa-comment-sms" 
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Sent Messages" icon="fas fa-envelope-open-text" onClick={ () => navigate("content", "list-messages") }/>
                        <NavItem text="Scheduled Messages" icon="fas fa-calendar-days" onClick={ () => navigate("content", "list-scheduled-messages") }/>
                        <NavItem text="Unapproved Messages" icon="fas fa-comment-slash" onClick={ () => navigate("content", "list-unapproved-messages") }/>
                        <NavItem text="Message Groups" icon="fas fa-users-rectangle" onClick={ () => navigate("content", "list-message-groups") }/>
                        <NavItem text="Group Recipients" icon="fas fa-arrows-down-to-people" onClick={ () => navigate("content", "list-message-group-recipients") }/>
                        <NavItem text="Message Languages" icon="fas fa-language" onClick={ () => navigate("content", "list-message-languages") }/>
                        <NavItem text="Message Segments" icon="fas fa-comments" onClick={ () => navigate("content", "list-message-segments") }/>
                        <NavItem text="Message Recipients" icon="fas fa-mobile-retro" onClick={ () => navigate("content", "list-message-recipients") }/>
                    </NavItems>
                </NavItem>

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

                <NavItem text="Sales" icon="fas fa-hand-holding-dollar" onClick={ () => navigate("content", "list-sales") }/>
                <NavItem text="Price List" icon="fas fa-receipt" onClick={ () => navigate("content", "list-pricelist") }/>
                <NavItem text="Business Fields" icon="fas fa-chart-column" onClick={ () => navigate("content", "list-business-fields") }/>
                <NavItem text="Countries" icon="fas fa-earth-americas" onClick={ () => navigate("content", "list-countries") }/>
                <NavItem text="Operators" icon="fas fa-tower-cell" onClick={ () => navigate("content", "list-operators") }/>
                <NavItem text="Tickets" icon="fas fa-ticket" onClick={ () => navigate("content", "list-tickets") }/>
                <NavItem text="Logout" icon="fas fa-right-from-bracket" onClick={ () => signout() }/>

            </Sidebar>

            <Content>
                <TopNav/>
            </Content>
            <Notification/>
        </Dashboard>
    )
}

export default SuperAdminDashboard