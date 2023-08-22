import { randomString } from "../../utils/helper"

const DataCells = ({ columns, row }) => {

    return (
        columns.map(column =>
            <td key={ column + "-" + randomString(5) }>{ typeof row[column] === "boolean"? row[column] ? "Yes" : "No" : row[column] ?? "NULL"}</td>
        )
    )

}

export default DataCells