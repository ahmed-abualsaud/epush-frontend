import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const EditMessageFilter = ({ messageFilter }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(messageFilter).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateMessageFilter } = useCoreApi()
    const [currentMessageFilter, setCurrentMessageFilter] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentMessageFilter(messageFilter)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificMessageFilter = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-message-filter-input, "
        })

        let messageFilterInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        messageFilterInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new message filter information")

        if (! isEmpty(data)) {
            let newMessageFilter = await updateMessageFilter(messageFilter.id, data)
            if (! isEmpty(newMessageFilter)) {
                setCurrentMessageFilter(newMessageFilter)
                showAlert("Message Filter information updated successfully");
            }
        }
    }



    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Message Filter Information</h1>
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
                            <td>{ typeof currentMessageFilter[column] === "boolean"? currentMessageFilter[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentMessageFilter[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-message-filter-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificMessageFilter()}>Update Message Filter</button>
            </div>
        </div>
    )
}

export default EditMessageFilter