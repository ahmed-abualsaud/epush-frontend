import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";

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
        <Page title="General Information">
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
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentMessageFilter[col] === "boolean"? currentMessageFilter[col] ? "Yes" : "No" : currentMessageFilter[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </Page>
    )
}

export default ShowMessageFilter