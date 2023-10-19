const Profile = ({ user }) => {

    const excludedColumns = [
        "clientId", 
        "isNotify", 
        "ip_required", 
        "ip", 
        "deleteDate", 
        "updateDate", 
        "saveDate", 
        "reg_date", 
        "areaId",
        "agree", 
        "active", 
        "userId", 
        "adminId", 
        "business_field_id" , 
        "sales_id", 
        "show_msg_details", 
        "birthDate", 
        "FDelete", 
        "access", 
        "IsTestAccount", 
        "governmentId", 
        "created_at", 
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "fullName",
        "mobile",
        "use_api",
        "api_token",
        "pricelistId",
        "id",
    ]

    const filteredColumns = user ? Object.keys(user).filter(
        (column) => !excludedColumns.includes(column)
    ) : []

    return (
        <div className="component-container">
            <h1 className="content-header">Profile Information</h1>
            <div className="user-image">
                <div className="image-wrapper">
                    <img src={user.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
                    <input id="add-client-avatar-input" type="file" accept="image/*"/>
                    <i className="uil uil-camera-plus"></i>
                </div>
            </div>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns.map((col) => (
                        col === "websites" ?
                        user.websites?.map((website) => (
                            <tr>
                                <td style={{fontSize: "22px"}}>{col}</td>
                                <td style={{fontSize: "22px"}}>{ website.url }</td>
                            </tr>
                        )) :
                        <tr>
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof user[col] === "boolean"? user[col] ? "Yes" : "No" : user[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Profile