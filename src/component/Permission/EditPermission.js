import useAuthApi from "../../api/useAuthApi"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import Page from "../../page/Page"



const EditPermission = ({ permission }) => {

    const excludedColumns = ["id", "full_name", "avatar", "enabled", "created_at", "updated_at", "deleted_at", "email_verified_at"]

    const filteredColumns = Object.keys(permission).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updatePermission } = useAuthApi()
    const [currentPermission, setCurrentPermission] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentPermission(permission)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificPermission = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-permission-input, "
        })

        let permissionInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        permissionInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new permission information")

        if (! isEmpty(data)) {
            let newPermission = await updatePermission(permission["id"], data)
            if (! isEmpty(newPermission)) {
                setCurrentPermission(newPermission)
                showAlert("Permission information updated successfully");
            }
        }
    }

    return (
        <Page title="Permission Information">
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
                            <td>{ typeof currentPermission[column] === "boolean"? currentPermission[column] ? "Yes" : "No" : currentPermission[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-permission-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>
            <div className="button-container">
                <button className="button" onClick={() => updateSpecificPermission()}>Update Permission</button>
            </div>
        </Page>
    )
}

export default EditPermission
