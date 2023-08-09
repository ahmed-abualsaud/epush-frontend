import { useState } from 'react'
import '../assets/style/component/table.css'
import { navigate } from "../setup/navigator"
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
    "pricelist_Id", 
    "show_msg_details", 
    "birthDate", 
    "FDelete", 
    "access", 
    "IsTestAccount", 
    "governmentId", 
    "first_name", 
    "last_name", 
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
    "religion",
    "user_id",
    "sales_id",
    "business_field_id",
    "sales",
    "business_field"
  ]
  const [deletedRows, setDeletedRows] = useState([])

  const filteredColumns = data[0] ? Object.keys(data[0]).filter(
    (column) => !excludedColumns.includes(column)
  ) : []

  const addNewEntity = () => {
    entity === "User" && navigate("content", "add-general-user");
    entity === "Role" && navigate("content", "add-role");    
    entity === "Client" && navigate("content", "add-client-user");    
    entity === "Admin" && navigate("content", "add-admin-user");    
  }

  const deleteEntity = (entityID) => {
    navigate("modal-content", "delete-modal", entity, entityID, deletedRows, setDeletedRows)
  }

  return (
      <div className=".fl-table-container">
        <table className="fl-table">
          <thead>
            <tr>
              <th key="#">#</th>
              {filteredColumns.map((column) => (
                ! ["websites", "sales", "business_field"].includes(column) && <th className="th-nowrap" key={column}>{snakeToBeautifulCase(column)}</th>
              ))}

              {entity === "Client" && (<>
                <th className="th-nowrap" key="sales-name">Sales Name</th>
                <th className="th-nowrap" key="business-field">Business Field</th>
              </>)}
              {entity !== "Permission" && 
                <th style={{padding: "0"}} colSpan={3} key="add">
                  <a href="#" className="button add-button" onClick={() => addNewEntity()}><i className="uil uil-plus"></i>Add</a>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              ! deletedRows.includes(["Client", "Admin"].includes(entity) ? row["user_id"] : row["id"]) &&
              <tr id={entity + "-" + row["id"]} key={index}>
                <td key={ "#" + index + 1 }>{ index + 1 }</td>
                {filteredColumns.map((col) => (
                  ! ["websites", "sales", "business_field"].includes(col) && <td className="td-break" key={ col + index + 1 }>{ typeof row[col] === "boolean"? row[col] ? "Yes" : "No" : row[col] ?? "NULL"}</td>
                ))}
                {entity === "Client" && (<>
                  <td className="td-break" key="sales-name">{row.sales?.name?? "NULL"}</td>
                  <td className="td-break" key="business-field">{row.business_field?.name?? "NULL"}</td>
                </>)}

                <td
                  style={{padding: "0"}}
                  onClick={() => ["User", "Client", "Admin"].includes(entity) ? navigate("content", "show-user-info", row, entity === "User") : navigate("modal-content", "show-modal", entity, row, ["id", ...filteredColumns])}
                  key="show" 
                  className="operation"
                >
                  <a className="modal-button" href={["User", "Client", "Admin"].includes(entity) ? "#" : "#popup"}><i className="uil uil-eye"></i></a>
                </td>

                <td
                  style={{padding: "0"}}
                  key="edit" 
                  onClick={() => navigate("content", 
                    entity === "User"? "edit-user" : 
                    entity === "Role"? "edit-role" : 
                    entity === "Admin"? "edit-admin" : 
                    entity === "Client"? "edit-client" : 
                    "edit-permission", row)
                  } 
                  className="operation">
                  <a className="modal-button"><i className="uil uil-edit-alt"></i></a>
                </td>

                <td 
                  style={{padding: "0"}} 
                  onClick={() => deleteEntity(["Client", "Admin"].includes(entity) ? row["user_id"] : row["id"])} 
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