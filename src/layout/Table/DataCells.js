import { randomString } from "../../utils/helper"

const DataCells = ({ columns, row }) => {

    return (
        columns.map(column =>
            <td key={ column + "-" + randomString(5) }>{ typeof row[column] === "boolean"? row[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : row[column] ?? "NULL"}</td>
        )
    )

}

export default DataCells