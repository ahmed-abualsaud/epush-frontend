import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const EditSMSC = ({ smsc }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(smsc).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateSMSC } = useCoreApi()
    const [currentSMSC, setCurrentSMSC] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentSMSC(smsc)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificSMSC = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-smsc-input, "
        })

        let smscInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        smscInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new smsc information")

        if (! isEmpty(data)) {
            let newSMSC = await updateSMSC(smsc.id, data)
            if (! isEmpty(newSMSC)) {
                setCurrentSMSC(newSMSC)
                showAlert("SMSC information updated successfully");
            }
        }
    }



    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">SMSC Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                    <th>Attribute Name</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns?.map((column) => (
                        <tr>
                            <td>{ column }</td>
                            <td>{ typeof currentSMSC[column] === "boolean"? currentSMSC[column] ? "Yes" : "No" : currentSMSC[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-smsc-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="update-role">
                <button className="button" onClick={() => updateSpecificSMSC()}>Update SMSC</button>
            </div>
        </div>
    )
}

export default EditSMSC