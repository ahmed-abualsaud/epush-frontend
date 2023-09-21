import { useState } from "react"
import FileInput from "../../../layout/Shared/FileInput"
import ItemsList from "../../../layout/List/ItemsList"
import { parseExcelFile, parseTextFile, parseWordFile } from "../../../utils/file"

const FromFileAddition = ({ setRecipients }) => {

    const [numbers, setNumbers] = useState([])

    const onSelectFile = (file) => {
        let nums = []
        let content = file.result

        switch (file.attributes.type) {
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                nums = [...new Set(parseWordFile(content).filter(n => n && n))].filter(Number)
                setNumbers(nums)
                setRecipients(nums)
                break

            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                nums = [...new Set(parseExcelFile(content).filter(n => n && n))].filter(Number)
                setNumbers(nums)
                setRecipients(nums)
                break

            default:
                nums = [...new Set(parseTextFile(content).filter(n => n && n))].filter(Number)
                setNumbers(nums)
                setRecipients(nums)
                break
        }
    }

    return (
        <div>
            <div style={{marginTop: "120px"}}>
            <div className="d-flex justify-content-between">
                <pre style={{fontSize: "20px", whiteSpace: "pre-wrap"}}>
                    Supported Files: <br/>
                        1- plaintexts: .txt <br/>
                        2- excel: .xlsx <br/>
                        3- word: .docx 
                </pre>
                <div style={{width: "40%", marginTop: "15px", display: "flex", justifyContent: "center"}}>
                    <FileInput onSelectFile={onSelectFile}/>
                </div>
                <div style={{width: "40%"}}>
                    <ItemsList items={numbers}/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default FromFileAddition