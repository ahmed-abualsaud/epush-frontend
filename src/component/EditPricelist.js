import useCoreApi from "../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../utils/helper"
import { showAlert } from "../utils/validator"

const EditPricelist = ({ pricelist }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(pricelist).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updatePricelist } = useCoreApi()
    const [currentPricelist, setCurrentPricelist] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentPricelist(pricelist)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificPricelist = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-pricelist-input, "
        })

        let pricelistInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        pricelistInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new pricelist information")

        if (! isEmpty(data)) {
            let newPricelist = await updatePricelist(pricelist.id, data)
            if (! isEmpty(newPricelist)) {
                setCurrentPricelist(newPricelist)
                showAlert("Price information updated successfully");
            }
        }
    }



    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Pricelist Information</h1>
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
                            <td>{ typeof currentPricelist[column] === "boolean"? currentPricelist[column] ? "Yes" : "No" : currentPricelist[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-pricelist-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="update-role">
                <button className="button" onClick={() => updateSpecificPricelist()}>Update Pricelist</button>
            </div>
        </div>
    )
}

export default EditPricelist