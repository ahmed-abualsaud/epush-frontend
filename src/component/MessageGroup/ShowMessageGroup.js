import Page from "../../page/Page"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"

const ShowMessageGroup = ({ messageGroup }) => {

    const execludedColumns = ["id", "user_id", "updated_at", "deleted_at", "recipients", "message_group_id", "client"]
    const filteredColumns = messageGroup ? Object.keys(messageGroup).filter(column => ! execludedColumns.includes(column)) : []

    const recipients = messageGroup['recipients']
    const recipientsColumns = ! isEmpty(messageGroup['recipients']) ? Object.keys(messageGroup['recipients'][0]).filter(column => ! execludedColumns.includes(column)) : []

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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof messageGroup[col] === "boolean"? messageGroup[col] ? "Yes" : "No" : messageGroup[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <h1 className="content-header mt-5">Recipients Information</h1>

            {isEmpty(recipients) ? <div className="no-data">The current group has no recipients</div> : 
                <table className="fl-table">
                    <thead>
                        <tr>
                            {recipientsColumns.map(col => 
                                <th>{snakeToBeautifulCase(col)}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map(recipient =>
                            <tr>
                                {recipientsColumns.map((col) => (
                                        <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof recipient[col] === "boolean"? recipient[col] ? "Yes" : "No" : recipient[col] ?? "NULL"}</td>
                                ))}
                            </tr>
                        )}
                        <tr key="last-row">
                            <td className="last-row" colSpan={recipientsColumns.length}></td>
                        </tr>
                    </tbody>
                </table>
            }
        </Page>
    )
}

export default ShowMessageGroup