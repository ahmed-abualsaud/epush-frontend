import { render } from "../../setup/navigator"
import { getElement } from "../../utils/dom"
import { isEmpty } from "../../utils/helper"
import { randomString } from "../../utils/strUtils"

const DataCells = ({ height, columns, row }) => {

    const showExpandIcon = (key) => {
        getElement("expand-icon-" + key)?.classList.remove("d-none")
    }

    const hideExpandIcon = (key) => {
        getElement("expand-icon-" + key)?.classList.add("d-none")
    }


    return (
        columns.map(column => <DataCell height={height} column={column} value={row[column]} onHoverExpandIcon={showExpandIcon} onLeaveExpandIcon={hideExpandIcon}/>)
    )
}

export default DataCells

const DataCell = ({ height, column, value, onHoverExpandIcon, onLeaveExpandIcon }) => {

    const tdKey = randomString(5)

    return (
        <td
            onMouseOver={() => onHoverExpandIcon(tdKey)}
            onMouseLeave={() => onLeaveExpandIcon(tdKey)}
            style={{
                position: "relative",
                maxWidth: "150px",
                minWidth: "100px",
            }}
            key={tdKey}
        >
            <div
            style={{
                maxHeight: height ?? "40px",
                overflowY: "auto",
            }}
            >
            {typeof value === "boolean" ? (
                value ? <i className="fas fa-check"></i> : <i className="fas fa-xmark"></i>
            ) : (typeof value === "function" ?  value() : (
                isEmpty(value) || value === "NULL" ? <i className="fas fa-ban"></i> : value
            ))}
            
            </div>
            <a 
                href="#popup"
                onClick={() => render("modal-content", "data-cell-details", column, value)}
                style={{
                    position: "absolute",
                    right: "-1px",
                    bottom: "-1px",
                    color: "#063F30"
                }}
            ><i id={"expand-icon-" + tdKey} class="d-none fas fa-maximize"></i></a>
        </td>
    )
}