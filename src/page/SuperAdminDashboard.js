import Card from "../layout/Card"
import useAxiosApi from "../api/Api"
import Header from "../layout/Header"
import Table from "../component/Table"
import Sidebar from "../layout/Sidebar"
import NavItem from "../layout/NavItem"
import NavItems from "../layout/NavItems"
import Content from "../component/Content"
import useAuthApi from "../api/useAuthApi"
import Dashboard from "../layout/Dashboard"
import useOrchiApi from "../api/useOrchiApi"
import Paginator from "../component/Paginator"
import ProfileNav from "../component/ProfileNav"

import PerPageDropList from "../component/PerPageDropList"
import React, { useEffect, useRef, useState } from "react"
import { isEmpty } from "../utils/helper"
import PageInput from "../component/PageInput"


const SuperAdminDashboard = () => {

    const { listUsers , listRoles, listPermissions } = useAuthApi()
    const { listServices } = useOrchiApi()
    const { sendGetRequest } = useAxiosApi()

    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [services, setServices] = useState([])
    const [permissions, setPermissions] = useState([])
    const [content, setContent] = useState("services")



    const setupLock = useRef(true)
    const setup = async () => {
        const srv = await listServices()
        if (srv) setServices(srv)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])



    const handleList = async (perPage, entity) => {
        if (entity === "user") {
            const usr = await listUsers(perPage)
            if (!isEmpty(usr?.data)) {
                setUsers(usr)
                setContent("users")
            }
        }
        if (entity === "role") {
            const rol = await listRoles(perPage)
            if (!isEmpty(rol?.data)) {
                setRoles(rol)
                setContent("roles")
            }
        }
        if (entity === "permission") {
            const prm = await listPermissions(perPage)
            if (!isEmpty(prm?.data)) {
                setPermissions(prm)
                setContent("permissions")
            }
        }
    }

    const handleGetPage = async (pageUrl, entity) => {
        const data = await sendGetRequest(pageUrl)
        if (! isEmpty(data?.data)) {
            if (entity === "user") {
                setUsers(data)
                setContent("users")
            }
            if (entity === "role") {
                setRoles(data)
                setContent("roles")
            }
            if (entity === "permission") {
                setPermissions(data)
                setContent("permissions")
            }
        }
    }



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
                        <NavItem text="Users" icon="uil uil-users-alt" onClick={ () => handleList(10, "user") }/>
                        <NavItem text="Roles" icon="yil uil-user-check" onClick={ () => handleList(10, "role") }/>
                        <NavItem text="Permissions" icon="uil uil-shield-check" onClick={ () => handleList(10, "permission") }/>

                    </NavItems>
                </NavItem>
            </Sidebar>

            <Content>
                <div>

                    {content === "services" && services.map((service) => (
                        <Card 
                            key={ service.id } 
                            title={ service.name.charAt(0).toUpperCase() + service.name.slice(1) }
                            icon={ service.name === "auth" ? "uil uil-lock-alt" : "uil uil-file-alt" }
                            description={ service.description }
                            identifier={ service.domain }
                        />
                    ))}

                    {content === "users" && 
                        <Table data={users.data} total={users.total} perPage={users.per_page}>
                            <PageInput url={users.links[1].url.split("?")[0] + "?take=" + users.per_page} entity="user" setPageHandler={handleGetPage} />
                            <Paginator links={users.links} perPage={users.per_page} entity="user" getPageHandler={ handleGetPage }/>
                            <PerPageDropList entity="user" perPageHandler={ handleList }/>
                        </Table>
                    }

                    {content === "roles" && 
                        <Table data={roles.data} total={roles.total} perPage={roles.per_page}>
                            <PageInput url={roles.links[1].url.split("?")[0] + "?take=" + roles.per_page} entity="role" setPageHandler={handleGetPage} />
                            <Paginator links={roles.links} perPage={roles.per_page} entity="role" getPageHandler={ handleGetPage }/>
                            <PerPageDropList entity="role" perPageHandler={ handleList }/>
                        </Table>
                    }

                    {content === "permissions" && 
                        <Table data={permissions.data} total={permissions.total} perPage={permissions.per_page}>
                            <PageInput url={permissions.links[1].url.split("?")[0] + "?take=" + permissions.per_page} entity="permission" setPageHandler={handleGetPage} />
                            <Paginator links={permissions.links} perPage={permissions.per_page} entity="permission" getPageHandler={ handleGetPage }/>
                            <PerPageDropList entity="permission" perPageHandler={ handleList }/>
                        </Table>
                    }

                </div>
            </Content>
        </Dashboard>
    )
}

export default SuperAdminDashboard