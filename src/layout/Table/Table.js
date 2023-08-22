import '../../assets/style/layout/table.css'

const Table = ({ children }) => {

    return (
        <div style={{overflowX: "auto"}}>
            <table className="fl-table">
                { children }
            </table>
        </div>
    )
}

export default Table