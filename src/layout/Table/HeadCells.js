import { snakeToBeautifulCase } from "../../utils/helper"

const HeadCells = ({ columns }) => {

    return (
        columns.map((column, index) => 
            <th className="th-nowrap" key={"head-" + index}>{snakeToBeautifulCase(column)}</th>
        )
    )
}

export default HeadCells