const ShowSMSCBinding = ({ smscBinding }) => {

    const excludedColumns = [
        "country", 
        "operator", 
        "smsc",
        "country_id",
        "operator_id",
        "smsc_id",
        "updated_at"
    ]

    const filteredColumns = smscBinding ? Object.keys(smscBinding).filter(column => ! excludedColumns.includes(column)) : []

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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof smscBinding[col] === "boolean"? smscBinding[col] ? "Yes" : "No" : smscBinding[col] ?? "NULL"}</td>
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

export default ShowSMSCBinding