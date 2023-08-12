import '../../assets/style/layout/table.css'

const Table = ({ children }) => {

    return (
        <table className="fl-table">
            { children }
        </table>
    )
}

export default Table