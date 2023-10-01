import { useState } from "react"
import { parseExcelFile, parseTextFile, parseWordFile } from "../../utils/file"
import FileInput from "../../layout/Shared/FileInput"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import TableBody from "../../layout/Table/TableBody"
import HeadRow from "../../layout/Table/HeadRow"
import DataRows from "../../layout/Table/DataRows"
import HeadCells from "../../layout/Table/HeadCells"
import { arrayCombine, isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const ImportRecipientsData = ({ setGroupRecipients }) => {

    const [columns, setColumns] = useState([])
    const [recipientsTable, setRecipientsTable] = useState([])

    const onSelectFile = (file) => {
        let recips = []
        let content = file.result

        switch (file.attributes.type) {
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                recips = [...new Set(parseWordFile(content).filter(n => n && n))]
                break

            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                recips = [...new Set(parseExcelFile(content).filter(n => n && n))]
                break

            default:
                recips = [...new Set(parseTextFile(content).filter(n => n && n))]
                break
        }

        let recipTable = []
        let table = recips.map(recip => recip.split(/,\s*/))
        if (! (table[0].includes("phone") || table[0].includes("Phone"))) {
            showAlert("Phone column is required in the uploaded data")
            return
        }

        for (let i = 1; i < table.length; i++) {
            recipTable.push(arrayCombine(table[0], table[i]))
        }

        setColumns(Object.keys(recipTable[0]))
        setRecipientsTable(recipTable)
        setGroupRecipients([{recipients: recipTable.map(recip => {
            let { phone, Phone, ...attributes } = recip;
            return {number: phone ?? Phone, attributes: JSON.stringify(Object.entries(attributes).map(([name, value]) => ({ name, value })))}
        })}])
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <pre style={{width: "50%", fontSize: "25px", display: "flex", justifyContent: "center"}}>
                    * Supported Files: <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;1- plaintexts: .txt <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;2- excel: .xlsx <br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;3- word: .docx 
                </pre>
                <div style={{width: "50%", marginTop: "15px", display: "flex", justifyContent: "center"}}>
                    <FileInput onSelectFile={onSelectFile}/>
                </div>
            </div>
            <div className={`mt-5 ${isEmpty(recipientsTable) ? "d-none" : "d-block"}`}>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={recipientsTable}/>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ImportRecipientsData