import { snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const DataCellDetails = ({ column, value }) => {

    function copyToClipboard() {
        navigator.clipboard.writeText(value)
        .then(() => {
            showAlert('Password copied to clipboard')
        })
        .catch(err => {
            showAlert('Error copying Password to clipboard')
        })
    }

    return (
        <div>
            <h1 className="popup-header">{snakeToBeautifulCase(column)}</h1>
            <div className="popup-content m-0 p-4">{
                typeof value === "boolean" ? (
                    value ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>
                ) : (
                    value ?? <i className="fas fa-ban"></i>
                    )
            }</div>
            <div className="popup-button-wrapper m-3">
                <button className="button" onClick={() => copyToClipboard()}>Copy to Clipboard <i className="uil uil-copy"></i></button>
            </div>
        </div>
    )
}

export default DataCellDetails