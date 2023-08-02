import { useEffect, useRef, useState } from "react";
import useCoreApi from "../api/useCoreApi";

const ShowUserInfo = ({ user }) => {

    const excludedColumns = [
        // "clientId", 
        // "isNotify", 
        // "ip_required", 
        // "ip", 
        // "deleteDate", 
        // "updateDate", 
        // "saveDate", 
        // "reg_date", 
        // "areaId",
        // "agree", 
        // "active", 
        // "userId", 
        // "adminId", 
        // "business_field_id" , 
        // "sales_id", 
        // "show_msg_details", 
        // "birthDate", 
        // "FDelete", 
        // "access", 
        // "IsTestAccount", 
        // "governmentId", 
        // "first_name", 
        // "last_name", 
        // "created_at", 
        // "updated_at", 
        // "deleted_at", 
        // "avatar", 
        // "email_verified_at"
    ]

    const [client, setClient] = useState([])
    const { getClient } = useCoreApi()

    const filteredColumns = client ? Object.keys(client).filter(
        (column) => !excludedColumns.includes(column)
    ) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getClient(user.id)
        if (clt) setClient(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
            <div className="user-image">
                <div className="image-wrapper">
                    <img src={client.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
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
                        client.websites?.map((website) => (
                            <tr>
                                <td style={{fontSize: "22px"}}>{col}</td>
                                <td style={{fontSize: "22px"}}>{ website.url }</td>
                            </tr>
                        )) :
                        <tr>
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof client[col] === "boolean"? client[col] ? "Yes" : "No" : client[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowUserInfo