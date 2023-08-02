import { navigate } from "../setup/navigator"
import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import Content from "../layout/Content"
import NavItem from "../layout/NavItem"
import NavItems from "../layout/NavItems"
import Dashboard from "../layout/Dashboard"
import ProfileNav from "../component/ProfileNav"

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
                        <NavItem text="Users" icon="uil uil-users-alt" onClick={ () => navigate("content", "users-table") }/>
                        <NavItem text="Roles" icon="yil uil-user-check" onClick={ () => navigate("content", "roles-table") }/>
                        <NavItem text="Permissions" icon="uil uil-shield-check" onClick={ () => navigate("content", "permissions-table") }/>
                    </NavItems>
                </NavItem>
            </Sidebar>

            <Content>
                
            </Content>
        </Dashboard>
    )
}

export default AdminDashboard