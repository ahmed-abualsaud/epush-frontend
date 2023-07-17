import '../assets/style/component/table.css'
import { snakeToBeautifulCase } from '../utils/helper'

const excludedColumns = ["id", "first_name", "last_name", "full_name", "created_at", "updated_at", "email_verified_at"]

const Table = ({ data, total, perPage, children }) => {

  const filteredColumns = Object.keys(data[0]).filter(
    (column) => !excludedColumns.includes(column)
  )

  return (
    <div>
      <table className="fl-table">
        <thead>
          <tr>
            <th key="#">#</th>
            {filteredColumns.map((column) => (
              <th key={column}>{snakeToBeautifulCase(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td key={ "#" + index + 1 }>{ index + 1 }</td>
              {filteredColumns.map((col) => (
                <td key={ col + index + 1 }>{ row[col] }</td>
              ))}
              <td key="show" className="operation"><i className="uil uil-eye"></i></td>
              <td key="show" className="operation"><i className="uil uil-edit-alt"></i></td>
              <td key="edit" className="operation"><i className="uil uil-trash-alt"></i></td>
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
            <td colSpan={filteredColumns.length + 2}>
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