import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"

const ShowMessageGroup = ({ messageGroup }) => {

    const execludedColumns = ["id", "user_id", "updated_at", "deleted_at", "recipients", "message_group_id", "client"]
    const filteredColumns = messageGroup ? Object.keys(messageGroup).filter(column => ! execludedColumns.includes(column)) : []

    const recipients = messageGroup['recipients']
    const recipientsColumns = ! isEmpty(messageGroup['recipients']) ? Object.keys(messageGroup['recipients'][0]).filter(column => ! execludedColumns.includes(column)) : []

    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof messageGroup[col] === "boolean"? messageGroup[col] ? "Yes" : "No" : messageGroup[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <h1 className="add-user-header mt-5">Recipients Information</h1>

            {isEmpty(recipients) ? <div className="user-no-perm">The current group has no recipients</div> : 
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
        </div>
    )
}

export default ShowMessageGroup