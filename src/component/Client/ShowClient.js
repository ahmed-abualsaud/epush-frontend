import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import { isEmpty } from "../../utils/helper";

const ShowClient = ({ client }) => {

    const [currentClient, setCurrentClient] = useState([])
    const [currentClientOrders, setCurrentClientOrders] = useState([])
    const [currentClientOrdersColumns, setCurrentClientOrdersColumns] = useState([])
    const { getClient, getClientOrders } = useCoreApi()

    const filteredColumns = client ? Object.keys(client) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getClient(client.user_id)
        if (clt) setCurrentClient(clt)

        const cltord = await getClientOrders(client.user_id)
        if (! isEmpty(cltord)) {
            setCurrentClientOrders(cltord)
            setCurrentClientOrdersColumns(Object.keys(cltord[0]).filter(ord => ! ["updated_at"].includes(ord)))
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (<>

        <div className="add-user-container mb-5">
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
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="add-user-container my-5">
            <h1 className="add-user-header">Client Orders</h1>
            {isEmpty(currentClientOrders) ? <div className="user-no-perm"> Client has no Orders! </div> :
            <table className="fl-table">
                <thead>
                    <tr>
                        {currentClientOrdersColumns.map((column) => (
                            <th style={{fontSize: "22px"}}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentClientOrders.map(currentClientOrder => (
                        <tr>
                            {currentClientOrdersColumns.map((column) => (
                                <td style={{fontSize: "22px"}} key={ column + "-show-user-info" }>{ typeof currentClientOrder[column] === "boolean"? currentClientOrder[column] ? "Yes" : "No" : currentClientOrder[column] ?? "NULL"}</td>
                            ))}
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={currentClientOrdersColumns.length}></td>
                    </tr>
                </tbody>
            </table>}
        </div>
    </>)
}

export default ShowClient