import Header from "../layout/Shared/Header"
import Sidebar from "../layout/Navigation/Sidebar"
import Content from "../layout/Shared/Content"
import NavItem from "../layout/Navigation/NavItem"
import NavItems from "../layout/Navigation/NavItems"
import Dashboard from "../layout/Shared/Dashboard"
import ProfileNav from "../component/Header/ProfileNav"
import TableContent from "../layout/Shared/TableContent"
import { navigate } from "../setup/navigator"

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

export default AdminDashboard