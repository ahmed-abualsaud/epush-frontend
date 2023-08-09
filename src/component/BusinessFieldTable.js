import useCoreApi from "../api/useCoreApi"
import { navigate } from "../setup/navigator"
import { useEffect, useRef, useState } from "react"
import { snakeToBeautifulCase } from "../utils/helper"


const BusinessFieldTable = () => {


    const [columns, setColumns] = useState([])
    const [businessFields, setBusinessFields] = useState([])
    const [deletedRows, setDeletedRows] = useState([])
    const { listBusinessFields } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listBusinessFields()
        if (prclst) setBusinessFields(prclst)
        setColumns(prclst[0] ? Object.keys(prclst[0]) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewEntity = () => {
        navigate("content", "add-business-field");    
    }
    
    const deleteEntity = (entityID) => {
        navigate("modal-content", "delete-modal", "Business Field", entityID, deletedRows, setDeletedRows)
    }

    return (
      <div className="add-user-container">
      <h1 className="add-user-header">All Business Fields</h1>
        <table className="fl-table mt-5">
          <thead>
            <tr>
              <th key="#">#</th>
              {columns.map((column) => (
                column !== "websites" && <th className="th-nowrap" key={column}>{snakeToBeautifulCase(column)}</th>
              ))}
              <th style={{padding: "0"}} colSpan={3} key="add">
              <a href="#" className="button add-button" onClick={() => addNewEntity()}><i className="uil uil-plus"></i>Add</a>
              </th>
            </tr>
          </thead>
          <tbody>
            {businessFields?.map((row, index) => (
              ! deletedRows.includes(row["id"]) &&
              <tr id={"business-field" + "-" + row["id"]} key={index}>
                <td key={ "#" + index + 1 }>{ index + 1 }</td>
                {columns.map((col) => (
                  <td className="td-break" key={ col + index + 1 }>{ typeof row[col] === "boolean"? row[col] ? "Yes" : "No" : row[col] ?? "NULL"}</td>
                ))}
                <td
                  style={{padding: "0"}}
                  onClick={() => navigate("modal-content", "show-modal", "BusinessField", row, ["id", ...columns])}
                  key="show" 
                  className="operation"
                >
                  <a className="modal-button" href="#popup"><i className="uil uil-eye"></i></a>
                </td>

                <td
                  style={{padding: "0"}}
                  key="edit" 
                  onClick={() => navigate("content", "edit-business-field", row)} 
                  className="operation">
                  <a className="modal-button"><i className="uil uil-edit-alt"></i></a>
                </td>

                <td 
                  style={{padding: "0"}} 
                  onClick={() => deleteEntity(row["id"])} 
                  key="delete" 
                  className="operation"
                >
                  <a className="modal-button btn-del" href="#popup"><i className="uil uil-trash-alt"></i></a>
                </td>
              </tr>
            ))}
            <tr>
              <td className="last-row" colSpan={columns.length + 4}></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default BusinessFieldTable