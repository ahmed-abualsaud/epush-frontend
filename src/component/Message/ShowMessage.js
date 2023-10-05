import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"

const ShowMessage = ({ message }) => {

    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "order_id",
        "sender_id",
        "order",
        "sender",
        "recipients",
        "segments",
        "message_id",
        "message_language_id",
        "message_group_recipient",
        "message_group_recipient_id",
    ]

    const filteredColumns = message ? Object.keys(message).filter(
        (column) => ! excludedColumns.includes(column)
    ) : []

    const recipientsColumns = ["number", "attributes", ...Object.keys(message['recipients'].length > 0 ? message['recipients'][0] : []).filter(
        (column) => ! excludedColumns.includes(column)
    )]

    const segmentsColumns = Object.keys(message['segments'].length > 0 ? message['segments'][0] : []).filter(
        (column) => ! excludedColumns.includes(column)
    )


    return (
        <div>
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
                        {filteredColumns?.map((col) => (
                            <tr>
                                <td style={{fontSize: "22px"}}>{col}</td>
                                <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof message[col] === "boolean"? message[col] ? "Yes" : "No" : message[col] ?? "NULL"}</td>
                            </tr>
                        ))}
                        <tr key="last-row">
                            <td className="last-row" colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="add-user-container mt-5">
                <h1 className="add-user-header">Recipients Information</h1>
                {isEmpty(message['recipients'])? <div className="user-no-perm">Message has no recipients</div>:
                    <div>
                        <div className="d-flex justify-content-center m-3" style={{fontSize: "20px"}}>Total Number of Recipients = {message['recipients'].length}</div>
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    {recipientsColumns.map(recipientColumn =>
                                        <th>{snakeToBeautifulCase(recipientColumn)}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {message['recipients'].map(recipient =>
                                    <tr>
                                        {recipientsColumns?.map((col) => {
                                            if (col === "number") {
                                                return <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{recipient?.message_group_recipient?.number ?? "NULL"}</td>
                                            } else if (col === "attributes") {
                                                return <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{recipient?.message_group_recipient?.attributes ?? "NULL"}</td>
                                            } else {
                                                return <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof recipient[col] === "boolean"? recipient[col] ? "Yes" : "No" : recipient[col] ?? "NULL"}</td>
                                            }
                                        })}
                                    </tr>
                                )}
                                <tr key="last-row">
                                    <td className="last-row" colSpan={recipientsColumns.length}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <div className="add-user-container mt-5">
                <h1 className="add-user-header">Segments Information</h1>
                {isEmpty(message['segments'])? <div className="user-no-perm">Message has no segments</div>:
                    <div>
                        <div className="d-flex justify-content-center m-3" style={{fontSize: "20px"}}>Total Number of Segments = {message['segments'].length}</div>
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    {segmentsColumns.map(segmentColumn =>
                                        <th>{snakeToBeautifulCase(segmentColumn)}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {message['segments'].map(segment =>
                                    <tr>
                                        {segmentsColumns?.map((col) => (
                                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof segment[col] === "boolean"? segment[col] ? "Yes" : "No" : segment[col] ?? "NULL"}</td>
                                        ))}
                                    </tr>
                                )}
                                <tr key="last-row">
                                    <td className="last-row" colSpan={segmentsColumns.length}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default ShowMessage