import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";

const ShowSMSC = ({ smsc }) => {

    const [currentSMSC, setCurrentSMSC] = useState([])
    const { getSMSC } = useCoreApi()

    const filteredColumns = smsc ? Object.keys(smsc) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getSMSC(smsc.id)
        if (clt) setCurrentSMSC(clt)
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentSMSC[col] === "boolean"? currentSMSC[col] ? "Yes" : "No" : currentSMSC[col] ?? "NULL"}</td>
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

export default ShowSMSC