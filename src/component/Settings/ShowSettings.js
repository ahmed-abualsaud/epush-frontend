import { useEffect, useRef, useState } from "react";
import useSettingsApi from "../../api/useSettingsApi";

const ShowSettings = ({ settings }) => {

    const [currentSettings, setCurrentSettings] = useState([])
    const { getSettings } = useSettingsApi()

    const filteredColumns = settings ? Object.keys(settings) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getSettings(settings.id)
        if (clt) setCurrentSettings(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns.map((col) => (
                        <tr>
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentSettings[col] === "boolean"? currentSettings[col] ? "Yes" : "No" : currentSettings[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShowSettings