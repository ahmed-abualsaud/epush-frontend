import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import Page from "../../page/Page"
import useFileApi from "../../api/useFileApi"

const EditFolder = ({ folder }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(folder).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateFolder } = useFileApi()
    const [currentFolder, setCurrentFolder] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentFolder(folder)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificFolder = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-folder-input, "
        })

        let folderInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        folderInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new folder information")

        if (! isEmpty(data)) {
            let newFolder = await updateFolder(folder.id, data)
            if (! isEmpty(newFolder)) {
                setCurrentFolder(newFolder)
                showAlert("Folder information updated successfully");
            }
        }
    }



    return (
        <Page title="Folder Information">
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
                            <td>{ typeof currentFolder[column] === "boolean"? currentFolder[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentFolder[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-folder-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificFolder()}>Update Folder</button>
            </div>
        </Page>
    )
}

export default EditFolder