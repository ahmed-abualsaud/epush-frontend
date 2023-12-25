import React, { useState } from "react";
import DataCells from "./DataCells";
import TableRow from "./TableRow";
import { isEmpty } from "../../utils/helper";

const DataRows = ({ height, columns, rows, except, children }) => {

    const [deletedRows, setDeletedRows] = useState([])

    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []
    children = typeof children === "function" ? [children] : children

    const onDelete = (id) => {
        setDeletedRows([...deletedRows, id])

    }

    return (
        <>
            {isEmpty(rows)?<tr><td colSpan={2} className="no-data">
                <div style={{position: "absolute", width: "200px", left: "50%", fontSize: "40px"}}>No Data</div>
            </td></tr> : 
            rows?.map((row, index) => (

                ! deletedRows.includes(row?.id) &&

                <TableRow height={height} key={"row" + index}>

                    <td key={ "#" + index + 1 }>{ index + 1 }</td>
                    <DataCells height={height} columns={columns} row={row} />

                    {(isEmpty(except) || isEmpty(except.find(exc => Object.values(exc)[0] === row[Object.keys(exc)[0]]))) && children.map(child => {
                        let component = child(row)
                        if (component.type.name === "DeleteRowCell" && component.props.hasOwnProperty("deleteFunction")) {
                            return child(row, () => onDelete(row?.id))
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