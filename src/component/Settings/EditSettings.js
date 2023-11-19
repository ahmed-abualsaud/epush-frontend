import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import useSettingsApi from "../../api/useSettingsApi"
import Page from "../../page/Page"

const EditSettings = ({ settings }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(settings).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateSettings } = useSettingsApi()
    const [currentSettings, setCurrentSettings] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentSettings(settings)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificSettings = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-settings-input, "
        })

        let settingsInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        settingsInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new settings information")

        if (! isEmpty(data)) {
            let newSettings = await updateSettings(settings.id, data)
            if (! isEmpty(newSettings)) {
                setCurrentSettings(newSettings)
                showAlert("Settings information updated successfully");
            }
        }
    }



    return (
        <Page title="Settings Information">
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
                            <td>{ typeof currentSettings[column] === "boolean"? currentSettings[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentSettings[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-settings-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificSettings()}>Update Settings</button>
            </div>
        </Page>
    )
}

export default EditSettings