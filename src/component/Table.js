import '../assets/style/component/table.css'
import ShowModal from './ShowModal'
import DeleteModal from './DeleteModal'
import { snakeToBeautifulCase } from '../utils/helper'
import { render } from '../utils/dom'
import EditUser from './EditUser'
import AddUser from './AddUser'
import EditRole from './EditRole'
import EditPermission from './EditPermission'
import AddRole from './AddRole'
import { useState } from 'react'


const Table = ({ entity, data, total, perPage, children }) => {

  const excludedColumns = ["id", "first_name", "last_name", "created_at", "updated_at", "deleted_at", "avatar", "email_verified_at"]

  const filteredColumns = Object.keys(data[0]).filter(
    (column) => !excludedColumns.includes(column)
  )

  const [deletedRows, setDeletedRows] = useState([])

  const addNewEntity = () => {
    entity === "User" && render(<AddUser/>, "content");
    entity === "Role" && render(<AddRole/>, "content");    
  }

  const deleteEntity = (entityID) => {
    render(<DeleteModal entity={entity} entityID={entityID} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>, "modal-content")
  }

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th key="#">#</th>
            {filteredColumns.map((column) => (
              <th key={column}>{snakeToBeautifulCase(column)}</th>
            ))}
            {entity !== "Permission" && 
              <th style={{padding: "0"}} colSpan={3} key="add">
                <a className="button add-button" onClick={() => addNewEntity()}><i className="uil uil-plus"></i>Add</a>
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            ! deletedRows.includes(row["id"]) &&
            <tr id={entity + "-" + row["id"]} key={index}>
              <td key={ "#" + index + 1 }>{ index + 1 }</td>
              {filteredColumns.map((col) => (
                <td key={ col + index + 1 }>{ typeof row[col] === "boolean"? row[col] ? "Yes" : "No" : row[col] ?? "NULL"}</td>
              ))}
              <td
                style={{padding: "0"}}
                onClick={() => render(<ShowModal entity={entity} data={row} columns={["id", ...filteredColumns]}/>, "modal-content")} 
                key="show" 
                className="operation"
              >
                <a className="modal-button" href="#popup"><i className="uil uil-eye"></i></a>
              </td>

              <td
                style={{padding: "0"}}
                key="edit" 
                onClick={() => render(entity === "User"? <EditUser user={row}/> : entity === "Role"? <EditRole role={row}/> : <EditPermission permission={row}/>, "content")} 
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
            <td className="last-row" colSpan={filteredColumns.length + 4}></td>
          </tr>
          <tr className="pagination-row">
            <td className="page-input">
              {children[0]}
            </td>
            <td className="page-navigator" colSpan={filteredColumns.length}>
              {children[1]}
            </td>
            <td className="per-page" colSpan={3}>
              {children[2]}
            </td>
          </tr>
          <tr className="pagination-row">
            <td colSpan={filteredColumns.length + 2} style={{border: "none"}}>
              <div className="pagination-info">
                <div>total = {total}</div>
                <div>rows per page = {perPage}</div>
                <div>number of pages = {Math.ceil(parseFloat(total/perPage))}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table