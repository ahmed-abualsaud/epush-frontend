import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import Avatar from "../../layout/Shared/Avatar";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";

const ShowPartner = ({ partner }) => {

    const [currentPartner, setCurrentPartner] = useState([])
    const { getPartner } = useCoreApi()

    const filteredColumns = partner ? Object.keys(partner) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getPartner(partner.user_id)
        if (clt) setCurrentPartner(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <Page title="General Information">
            <Avatar imageUrl={currentPartner.avatar}/>

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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentPartner[col] === "boolean"? currentPartner[col] ? "Yes" : "No" : currentPartner[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Page>
    )
}

export default ShowPartner