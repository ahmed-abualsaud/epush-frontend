import React, { useState } from "react";
import DataCells from "./DataCells";
import TableRow from "./TableRow";

const DataRows = ({ columns, rows, children }) => {

    const [deletedRows, setDeletedRows] = useState([])

    children = children ? children.length === 1 ? [children] : children : []

    return (
        <>
            {rows.map((row, index) => (

                ! deletedRows.includes(row.id) &&

                <TableRow key={"row" + index}>

                    <td key={ "#" + index + 1 }>{ index + 1 }</td>
                    <DataCells columns={columns} row={row} />

                    {children.map(child => {
                        let component = child(row)
                        if (component.type.name === "DeleteRowCell" && component.props.hasOwnProperty("deleteFunction")) {
                            return child(row, deletedRows, setDeletedRows)
                        }
                        return component
                    })}
                </TableRow>
            ))}

            <TableRow key="last-row">
                <td className="last-row" colSpan={columns.length + 4}></td>
            </TableRow>
        </>
    );
};

export default DataRows;