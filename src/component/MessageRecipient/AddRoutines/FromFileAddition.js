import { useState } from "react"
import FileInput from "../../../layout/Shared/FileInput"
import ItemsList from "../../../layout/List/ItemsList"
import { parseExcelFile, parseTextFile, parseWordFile } from "../../../utils/file"
import { randomString } from "../../../utils/strUtils"

const FromFileAddition = ({ setGroupRecipients }) => {

    const [numbers, setNumbers] = useState([])
    const [messageGroupName, setMessageGroupName] = useState("group-" + randomString(8))


    const onSelectFile = (file) => {
        let nums = []
        let content = file.result

        switch (file.attributes.type) {
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                nums = [...new Set(parseWordFile(content).filter(n => n && n))].filter(Number)
                break

            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                nums = [...new Set(parseExcelFile(content).filter(n => n && n))].filter(Number)
                break

            default:
                nums = [...new Set(parseTextFile(content).filter(n => n && n))].filter(Number)
                break
        }

        setNumbers(nums)
        setGroupRecipients([{name: messageGroupName, recipients: nums.map(num => {return {number: num}})}])
    }

    return (
        <div className="d-flex justify-content-between">
            <pre style={{fontSize: "20px", whiteSpace: "pre-wrap"}}>
                * Supported Files: <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;1- plaintexts: .txt <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;2- excel: .xlsx <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;3- word: .docx 
            </pre>
            <div style={{width: "40%", marginTop: "15px", display: "flex", justifyContent: "center"}}>
                <FileInput onSelectFile={onSelectFile}/>
            </div>
            <div style={{width: "40%"}}>
                <ItemsList items={numbers}/>
            </div>
        </div>
    )
}

export default FromFileAddition