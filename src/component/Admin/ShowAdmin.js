import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import Avatar from "../../layout/Shared/Avatar";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";

const ShowAdmin = ({ admin }) => {

    const [currentAdmin, setCurrentAdmin] = useState([])
    const { getAdmin } = useCoreApi()

    const filteredColumns = admin ? Object.keys(admin) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getAdmin(admin.user_id)
        if (clt) setCurrentAdmin(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <Page title="General Information">
            <Avatar imageUrl={currentAdmin.avatar}/>

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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentAdmin[col] === "boolean"? currentAdmin[col] ? "Yes" : "No" : currentAdmin[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Page>
    )
}

export default ShowAdmin