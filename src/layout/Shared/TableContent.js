import TopNav from "./TopNav"

const TableContent = ({ tab, children }) => {

    return (
        <div style={{margin: "0 10px"}}>
            <TopNav tab={tab}/>
            <div>
                { children }
            </div>
        </div>
    )
}

export default TableContent