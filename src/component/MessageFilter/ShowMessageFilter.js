import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";

const ShowMessageFilter = ({ messageFilter }) => {

    const [currentMessageFilter, setCurrentMessageFilter] = useState([])
    const { getMessageFilter } = useCoreApi()

    const filteredColumns = messageFilter ? Object.keys(messageFilter) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getMessageFilter(messageFilter.id)
        if (clt) setCurrentMessageFilter(clt)
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentMessageFilter[col] === "boolean"? currentMessageFilter[col] ? "Yes" : "No" : currentMessageFilter[col] ?? "NULL"}</td>
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

export default ShowMessageFilter