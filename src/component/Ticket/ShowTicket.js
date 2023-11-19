import { useEffect, useRef, useState } from "react";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";
import useTicketApi from "../../api/useTicketApi";

const ShowTicket = ({ ticket }) => {

    const excludedColumns = [

        "id",
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "user_id"
    ]

    const [currentTicket, setCurrentTicket] = useState([])
    const { getTicket } = useTicketApi()

    const filteredColumns = ticket ? Object.keys(ticket).filter(
        (column) => !excludedColumns.includes(column)
    ) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getTicket(ticket.id)
        if (clt) setCurrentTicket(clt)
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentTicket[col] === "boolean"? currentTicket[col] ? "Yes" : "No" : currentTicket[col] ?? "NULL"}</td>
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

export default ShowTicket