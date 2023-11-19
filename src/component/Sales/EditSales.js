import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import Page from "../../page/Page"

const EditSales = ({ sales }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(sales).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateSales } = useCoreApi()
    const [currentSales, setCurrentSales] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentSales(sales)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificSales = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-sales-input, "
        })

        let salesInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        salesInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new sales information")

        if (! isEmpty(data)) {
            let newSales = await updateSales(sales.id, data)
            if (! isEmpty(newSales)) {
                setCurrentSales(newSales)
                showAlert("Sales information updated successfully");
            }
        }
    }



    return (
        <Page title="Sales Information">
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
                            <td>{ typeof currentSales[column] === "boolean"? currentSales[column] ? "Yes" : "No" : currentSales[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-sales-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificSales()}>Update Sales</button>
            </div>
        </Page>
    )
}

export default EditSales