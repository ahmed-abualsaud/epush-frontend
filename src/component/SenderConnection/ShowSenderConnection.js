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
        <div className="component-container">
            <h1 className="content-header">General Information</h1>
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof senderconnection[col] === "boolean"? senderconnection[col] ? "Yes" : "No" : senderconnection[col] ?? "NULL"}</td>
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

export default ShowSenderConnection