import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";

const ShowAdmin = ({ admin }) => {

    const [currentAdmin, setCurrentAdmin] = useState([])
    const { getAdmin } = useCoreApi()

    const filteredColumns = admin ? Object.keys(admin) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getAdmin(admin.user_id)
        if (clt) setCurrentAdmin(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
            <div className="user-image">
                <div className="image-wrapper">
                    <img src={currentAdmin.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
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
                        <tr>
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentAdmin[col] === "boolean"? currentAdmin[col] ? "Yes" : "No" : currentAdmin[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowAdmin