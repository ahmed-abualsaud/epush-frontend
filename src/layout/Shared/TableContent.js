import UsersTable from "../../component/User/ListUsers"
import TopNav from "./TopNav"

const TableContent = () => {

    return (
        <div>
            <TopNav/>
            <div id="table-content">
                <UsersTable/>
            </div>
        </div>
    )
}

export default TableContent