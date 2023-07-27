import Card from "../layout/Card"
import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import Content from "../layout/Content"
import NavItem from "../layout/NavItem"
import NavItems from "../layout/NavItems"
import Dashboard from "../layout/Dashboard"
import useOrchiApi from "../api/useOrchiApi"
import ProfileNav from "../component/ProfileNav"
import UsersTable from "../component/UsersTable"
import RolesTable from "../component/RolesTable"
import ServiceContexts from "../component/ServiceContexts"
import PermissionsTable from "../component/PermissionsTable"

import { render } from "../utils/dom"
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
                        {services.map((service) => (
                            <NavItem 
                                key={service.id} 
                                text={service.name.charAt(0).toUpperCase() + service.name.slice(1)} 
                                icon={ service.name === "auth" ? "uil uil-lock-alt" : "uil uil-file-alt" } 
                                onClick={() => render(<ServiceContexts service={service}/>, "content")}
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
                        <NavItem text="Users" icon="uil uil-users-alt" onClick={ () => render(<UsersTable/>, "content") }/>
                        <NavItem text="Roles" icon="yil uil-user-check" onClick={ () => render(<RolesTable/>, "content") }/>
                        <NavItem text="Permissions" icon="uil uil-shield-check" onClick={ () => render(<PermissionsTable/>, "content") }/>
                    </NavItems>
                </NavItem>
            </Sidebar>

            <Content>
                <div>
                    {services.map((service) => (
                        <Card 
                            key={ service.id } 
                            service={ service }
                            title={ service.name.charAt(0).toUpperCase() + service.name.slice(1) }
                            icon={ service.name === "auth" ? "uil uil-lock-alt" : "uil uil-file-alt" }
                            description={ service.description }
                            identifier={ service.domain }
                        />
                    ))}
                </div>
            </Content>
        </Dashboard>
    )
}

export default SuperAdminDashboard