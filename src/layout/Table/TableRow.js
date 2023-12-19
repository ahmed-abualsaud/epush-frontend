const TableRow = ({height, key, children }) => {

    return (
        <tr style={{height: height}} key={key}>
            { children }
        </tr>
    )
}

export default TableRow