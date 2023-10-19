import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const EditBusinessField = ({ businessField }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(businessField).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateBusinessField } = useCoreApi()
    const [currentBusinessField, setCurrentBusinessField] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentBusinessField(businessField)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificBusinessField = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-business-field-input, "
        })

        let businessFieldInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        businessFieldInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new business field information")

        if (! isEmpty(data)) {
            let newBusinessField = await updateBusinessField(businessField.id, data)
            if (! isEmpty(newBusinessField)) {
                setCurrentBusinessField(newBusinessField)
                showAlert("Business Field information updated successfully");
            }
        }
    }



    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Business Field Information</h1>
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
                            <td>{ typeof currentBusinessField[column] === "boolean"? currentBusinessField[column] ? "Yes" : "No" : currentBusinessField[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-business-field-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificBusinessField()}>Update Business Field</button>
            </div>
        </div>
    )
}

export default EditBusinessField