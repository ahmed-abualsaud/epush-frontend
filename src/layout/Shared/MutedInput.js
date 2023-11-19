import "../../assets/style/layout/muted-input.css"
import { showAlert } from "../../utils/validator"

const MutedInput = ({ id, value }) => {

    const copyToclipboard = () => {
        navigator.clipboard.writeText(value)
        .then(() => {
            showAlert('API Key Copied To Clipboard')
        })
        .catch(err => {
            showAlert('Error Copying API Key To Clipboard')
        })
    }

    return (
        <div className="muted-input-container">
            <input id={id} className="muted-input" type="text" value={value}/>
            <button title="Copy to Clipboard" className="muted-input-copy" onClick={copyToclipboard}><i className="fas fa-clipboard"></i></button>
        </div>
    )
}

export default MutedInput