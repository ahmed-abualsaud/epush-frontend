import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";

const ShowMessageLanguage = ({ messageLanguage }) => {

    const [currentMessageLanguage, setCurrentMessageLanguage] = useState([])
    const { getMessageLanguage } = useCoreApi()

    const filteredColumns = messageLanguage ? Object.keys(messageLanguage) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getMessageLanguage(messageLanguage.id)
        if (clt) setCurrentMessageLanguage(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="component-container">
            <h1 className="content-header">General Information</h1>
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentMessageLanguage[col] === "boolean"? currentMessageLanguage[col] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentMessageLanguage[col] ?? "NULL"}</td>
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

export default ShowMessageLanguage