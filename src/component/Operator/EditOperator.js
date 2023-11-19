import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import Page from "../../page/Page"

const EditOperator = ({ operator }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(operator).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateOperator } = useCoreApi()
    const [currentOperator, setCurrentOperator] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentOperator(operator)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificOperator = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-operator-input, "
        })

        let operatorInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        operatorInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new operator information")

        if (! isEmpty(data)) {
            let newOperator = await updateOperator(operator.id, data)
            if (! isEmpty(newOperator)) {
                setCurrentOperator(newOperator)
                showAlert("Operator information updated successfully");
            }
        }
    }



    return (
        <Page title="Operator Information">
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
                            <td>{ typeof currentOperator[column] === "boolean"? currentOperator[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentOperator[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-operator-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificOperator()}>Update Operator</button>
            </div>
        </Page>
    )
}

export default EditOperator