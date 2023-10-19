import { useEffect, useRef, useState } from "react";
import useAuthApi from "../../api/useAuthApi";

const ShowUser = ({ user }) => {

    const [currentUser, setCurrentUser] = useState([])
    const { getUser } = useAuthApi()

    const filteredColumns = user ? Object.keys(user) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getUser(user.id)
        if (clt) setCurrentUser(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="component-container">
            <h1 className="content-header">General Information</h1>
            <div className="user-image">
                <div className="image-wrapper">
                    <img src={currentUser.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
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
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentUser[col] === "boolean"? currentUser[col] ? "Yes" : "No" : currentUser[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowUser