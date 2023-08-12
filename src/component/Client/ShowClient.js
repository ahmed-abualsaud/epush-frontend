import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";

const ShowClient = ({ client }) => {

    const [currentClient, setCurrentClient] = useState([])
    const { getClient } = useCoreApi()

    const filteredColumns = client ? Object.keys(client) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getClient(client.user_id)
        if (clt) setCurrentClient(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
            <div className="user-image">
                <div className="image-wrapper">
                    <img src={currentClient.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
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
                        currentClient.websites?.map((website) => (
                            <tr>
                                <td style={{fontSize: "22px"}}>{col}</td>
                                <td style={{fontSize: "22px"}}>{ website.url }</td>
                            </tr>
                        )) :
                        col === "sales" ?
                        <tr>
                            <td style={{fontSize: "22px"}}>Sales name</td>
                            <td style={{fontSize: "22px"}}>{ currentClient.sales?.name ?? "NULL" }</td>
                        </tr>:
                        col === "business_field" ?
                        <tr>
                            <td style={{fontSize: "22px"}}>Business Field</td>
                            <td style={{fontSize: "22px"}}>{ currentClient.businessfield?.name ?? "NULL" }</td>
                        </tr>:
                        <tr>
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentClient[col] === "boolean"? currentClient[col] ? "Yes" : "No" : currentClient[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowClient