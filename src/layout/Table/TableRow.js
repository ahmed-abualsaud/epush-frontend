const TableRow = ({ key, children }) => {

    return (
        <tr key={key}>
            { children }
        </tr>
    )
}

export default TableRow