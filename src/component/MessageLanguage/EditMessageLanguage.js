import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import Page from "../../page/Page"

const EditMessageLanguage = ({ messageLanguage }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(messageLanguage).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateMessageLanguage } = useCoreApi()
    const [currentMessageLanguage, setCurrentMessageLanguage] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentMessageLanguage(messageLanguage)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificMessageLanguage = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-message-language-input, "
        })

        let messageLanguageInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        messageLanguageInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new message language information")

        if (! isEmpty(data)) {
            let newMessageLanguage = await updateMessageLanguage(messageLanguage.id, data)
            if (! isEmpty(newMessageLanguage)) {
                setCurrentMessageLanguage(newMessageLanguage)
                showAlert("Message Language information updated successfully");
            }
        }
    }



    return (
        <Page title="Message Language Information">
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
                            <td>{ typeof currentMessageLanguage[column] === "boolean"? currentMessageLanguage[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentMessageLanguage[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-message-language-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificMessageLanguage()}>Update Message Language</button>
            </div>
        </Page>
    )
}

export default EditMessageLanguage