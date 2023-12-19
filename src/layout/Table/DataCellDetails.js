import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const DataCellDetails = ({ column, value }) => {

    function copyToClipboard() {
        navigator.clipboard.writeText(typeof value === "function" ?  value() : value)
        .then(() => {
            showAlert(column + ' copied to clipboard')
        })
        .catch(err => {
            showAlert('Error copying ' + column + ' to clipboard')
        })
    }

    return (
        <div>
            <h1 className="popup-header">{snakeToBeautifulCase(column)}</h1>
            <div className="popup-content m-0 p-4" style={{position: "relative", wordBreak: "break-all"}}>{
                typeof value === "boolean" ? (
                    value ? <i className="fas fa-check"></i> : <i className="fas fa-xmark"></i>
                ) : ((typeof value === "function") ?  value() : 
                    (isEmpty(value) || value === "NULL" ? <i className="fas fa-ban"></i> : value)
                )
            }</div>
            <div className="popup-button-wrapper m-3">
                <button className="button" onClick={() => copyToClipboard()}>Copy to Clipboard<i className="uil uil-copy"></i></button>
            </div>
        </div>
    )
}

export default DataCellDetails