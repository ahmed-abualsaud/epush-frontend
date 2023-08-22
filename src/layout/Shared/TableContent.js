import ListUsers from "../../component/User/ListUsers"
import TopNav from "./TopNav"

const TableContent = ({ tab, children }) => {

    return (
        <div>
            <TopNav tab={tab}/>
            <div>
                { children }
            </div>
        </div>
    )
}

export default TableContent