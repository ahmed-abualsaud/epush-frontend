import React, { useEffect, useRef, useState } from "react"
import Dashboard from "../layout/Dashboard"
import NavItem from "../layout/NavItem"
import NavItems from "../layout/NavItems"
import Sidebar from "../layout/Sidebar"
import Header from "../layout/Header"
import ProfileNav from "../component/ProfileNav"
import Content from "../component/Content"
import useOrchiApi from "../api/useOrchiApi"
import Card from "../layout/Card"

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
                    <NavItem text="Users" icon="uil uil-users-alt" />
                    <NavItem text="Roles" icon="yil uil-user-check" />
                    <NavItem text="Permissions" icon="uil uil-shield-check" />
                </NavItems>
            </NavItem>
        </Sidebar>

        <Content>
            <div>
            {services.map((service) => (<>
                <Card 
                    key={ service.id } 
                    title={ service.name.charAt(0).toUpperCase() + service.name.slice(1) }
                    icon={ service.name === "auth" ? "uil uil-lock-alt" : "uil uil-file-alt" }
                    description={ service.description }
                    identifier={ service.domain }
                />
            </>
            ))}
            </div>
        </Content>
        </Dashboard>
    )
}

export default SuperAdminDashboard