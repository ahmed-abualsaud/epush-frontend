import "../../assets/style/layout/file-input.css"
import { getElement } from "../../utils/dom"
import { randomString } from "../../utils/strUtils"

const FileInput = ({ onSelectFile }) => {

    const inputKey = randomString(8)

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        getElement("file-input-label-" + inputKey).innerText = file.name
        const reader = new FileReader()
        reader.onload = function (e) {
            e.target.attributes = file
            onSelectFile(e.target)
        }
        reader.readAsBinaryString(file)
    }

    return (
        <div className="file-input-container">
            <input className="file-input" type="file" id={"file-input-" + inputKey} onChange={handleOnChange} onClick= { (e)=> { e.target.value = null }}/>
            <label className="file-input-label" id={"file-input-label-" + inputKey} for={"file-input-" + inputKey}>Choose a file</label>
        </div>
    )
}

export default FileInput