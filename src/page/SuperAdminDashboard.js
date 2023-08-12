import Header from "../layout/Shared/Header"
import Sidebar from "../layout/Navigation/Sidebar"
import Content from "../layout/Shared/Content"
import NavItem from "../layout/Navigation/NavItem"
import NavItems from "../layout/Navigation/NavItems"
import Dashboard from "../layout/Shared/Dashboard"
import useOrchiApi from "../api/useOrchiApi"
import ProfileNav from "../component/Header/ProfileNav"

import { navigate } from "../setup/navigator"
import TableContent from "../layout/Shared/TableContent"
import React, { useEffect, useRef, useState } from "react"

const SuperAdminDashboard = () => {

    const { listServices } = useOrchiApi()
    const [services, setServices] = useState([])


    const setupLock = useRef(true)
    const setup = async () => {
        const srv = await listServices()
        if (srv) setServices(srv)
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
                    text="Services"
                    icon="uil uil-dropbox"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem 
                            key="all" 
                            text="All"
                            icon="uil uil-align-alt" 
                            onClick={() => navigate("content", "all-services", services)}
                        />
                        {services.map((service) => (
                            <NavItem 
                                key={service.id} 
                                text={service.name.charAt(0).toUpperCase() + service.name.slice(1)} 
                                icon={ service.name === "auth" ? "uil uil-lock-alt" : service.name === "file" ? "uil uil-file-alt" : "uil uil-atom"} 
                                onClick={() => navigate("content", "service-contexts", service)}
                            />
                        ))}
                    </NavItems>
                </NavItem>

                <NavItem
                    text="Authorities"
                    icon="uil uil-shield-question"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Users" icon="uil uil-users-alt" onClick={ () => navigate("content", "table-content") }/>
                        <NavItem text="Roles" icon="yil uil-user-check" onClick={ () => navigate("content", "list-roles") }/>
                        <NavItem text="Permissions" icon="uil uil-shield-check" onClick={ () => navigate("content", "list-permissions") }/>
                    </NavItems>
                </NavItem>

                <NavItem text="Sales" icon="uil uil-money-withdraw" onClick={ () => navigate("content", "sales-table") }/>
                <NavItem text="Price List" icon="uil uil-receipt-alt" onClick={ () => navigate("content", "pricelist-table") }/>
                <NavItem text="Business Fields" icon="uil uil-analytics" onClick={ () => navigate("content", "business-field-table") }/>

                <NavItem
                    text="Expense"
                    icon="uil uil-dollar-alt"
                    onClick={handleClick}
                    onMouseLeave={handleLeave}
                >
                    <NavItems className="nav-flyout">
                        <NavItem text="Payment Methods" icon="uil uil-credit-card" onClick={ () => navigate("content", "payment-method-table") }/>
                    </NavItems>
                </NavItem>
            </Sidebar>

            <Content>
                <TableContent/>
            </Content>
        </Dashboard>
    )
}

export default SuperAdminDashboard