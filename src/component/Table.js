import { useState } from 'react'
import { navigate } from "../setup/navigator"
import '../assets/style/component/table.css'
import { snakeToBeautifulCase } from '../utils/helper'


const Table = ({ entity, data, total, perPage, children }) => {

  const excludedColumns = [
    "clientId", 
    "isNotify", 
    "ip_required", 
    "ip", 
    "deleteDate", 
    "updateDate", 
    "saveDate", 
    "reg_date", 
    "areaId",
    "agree", 
    "active", 
    "userId", 
    "adminId", 
    "business_field_id" , 
    "sales_id", 
    "show_msg_details", 
    "birthDate", 
    "FDelete", 
    "access", 
    "IsTestAccount", 
    "governmentId", 
    "first_name", 
    "last_name", 
    "created_at", 
    "updated_at", 
    "deleted_at", 
    "avatar", 
    "email_verified_at",
    "fullName",
    "mobile",
    "use_api",
    "api_token",
    "pricelistId",
    "id",
    "religion"
  ]

  const filteredColumns = data[0] ? Object.keys(data[0]).filter(
    (column) => !excludedColumns.includes(column)
  ) : []

  const [deletedRows, setDeletedRows] = useState([])

  const addNewEntity = () => {
    entity === "User" && navigate("modal-content", "add-user-modal");
    entity === "Role" && navigate("content", "add-role");    
  }

  const deleteEntity = (entityID) => {
    navigate("modal-content", "delete-modal", entity, entityID, deletedRows, setDeletedRows)
  }

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th key="#">#</th>
            {filteredColumns.map((column) => (
              <th className="th-nowrap" key={column}>{snakeToBeautifulCase(column)}</th>
            ))}
            {entity !== "Permission" && 
              <th style={{padding: "0"}} colSpan={3} key="add">
                <a href={entity === "User"? "#popup" : "#"} className="button add-button" onClick={() => addNewEntity()}><i className="uil uil-plus"></i>Add</a>
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
                <td className="td-break" key={ col + index + 1 }>{ typeof row[col] === "boolean"? row[col] ? "Yes" : "No" : row[col] ?? "NULL"}</td>
              ))}
              <td
                style={{padding: "0"}}
                onClick={() => entity === "User" ? navigate("content", "show-user-info", row) : navigate("modal-content", "show-modal", entity, row, ["id", ...filteredColumns])}
                key="show" 
                className="operation"
              >
                <a className="modal-button" href={entity === "User"? "#" : "#popup"}><i className="uil uil-eye"></i></a>
              </td>

              <td
                style={{padding: "0"}}
                key="edit" 
                onClick={() => navigate("content", entity === "User"? "edit-user" : entity === "Role"? "edit-role" : "edit-permission", row)} 
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