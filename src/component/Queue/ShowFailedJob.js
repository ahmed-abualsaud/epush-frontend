import { useEffect, useRef, useState } from "react";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";
import useQueueApi from "../../api/useQueueApi";

const ShowFailedJob = ({ job }) => {

    const [currentJob, setCurrentJob] = useState([])
    const { getQueueFailedJob } = useQueueApi()

    const filteredColumns = job ? Object.keys(job) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getQueueFailedJob(job.id)
        if (clt) setCurrentJob(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div>
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
                            <td style={{fontSize: "22px", wordBreak: "break-all"}} key={ col + "-show-user-info" }>{ typeof currentJob[col] === "boolean"? currentJob[col] ? "Yes" : "No" : currentJob[col] ?? "NULL"}</td>
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

export default ShowFailedJob