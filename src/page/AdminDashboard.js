import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import Content from "../layout/Content"
import NavItem from "../layout/NavItem"
import NavItems from "../layout/NavItems"
import Dashboard from "../layout/Dashboard"
import { render } from "../utils/dom"
import ProfileNav from "../component/ProfileNav"
import UsersTable from "../component/UsersTable"
import RolesTable from "../component/RolesTable"
import PermissionsTable from "../component/PermissionsTable"

const AdminDashboard = () => {



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
                
            </Content>
        </Dashboard>
    )
}

export default AdminDashboard