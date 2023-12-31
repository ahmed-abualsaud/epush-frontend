import Page from "../../page/Page"
import { snakeToBeautifulCase } from "../../utils/helper"

const ShowSenderConnection = ({ senderconnection }) => {

    const excludedColumns = [
        "id",
        "updated_at", 
        "deleted_at", 
        "sender_id",
        "smsc_id",
        "sender",
        "smsc"
    ]

    const filteredColumns = senderconnection ? Object.keys(senderconnection).filter(
        (column) => !excludedColumns.includes(column)
    ) : []


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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof senderconnection[col] === "boolean"? senderconnection[col] ? "Yes" : "No" : senderconnection[col] ?? "NULL"}</td>
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

export default ShowSenderConnection