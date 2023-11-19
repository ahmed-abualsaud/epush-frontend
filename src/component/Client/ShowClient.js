import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper";
import Avatar from "../../layout/Shared/Avatar";
import useSearchApi from "../../api/useSearchApi";
import Table from "../../layout/Table/Table";
import TableHead from "../../layout/Table/TableHead";
import HeadRow from "../../layout/Table/HeadRow";
import HeadCells from "../../layout/Table/HeadCells";
import TableBody from "../../layout/Table/TableBody";
import DataRows from "../../layout/Table/DataRows";
import Page from "../../page/Page";

const ShowClient = ({ client }) => {

    const [currentClient, setCurrentClient] = useState([])
    const [currentClientOrders, setCurrentClientOrders] = useState([])
    const currentClientOrdersColumns = ["credit", "sales_name", "pricelist", "payment_method", "collection_date", "created_at"]

    const { search } = useSearchApi()
    const { getClient } = useCoreApi()

    const filteredColumns = client ? Object.keys(client) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getClient(client.user_id)
        if (clt) setCurrentClient(clt)

        const cltord = await search("order", "user_id = " + client.user_id)
        if (! isEmpty(cltord)) {
            setCurrentClientOrders(cltord)
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (<>

        <Page title="General Information">
            <Avatar imageUrl={currentClient.avatar}/>

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
                                <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
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
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentClient[col] === "boolean"? currentClient[col] ? "Yes" : "No" : currentClient[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <div className="my-5">
                <h1 className="content-header">Client Orders</h1>
                {isEmpty(currentClientOrders) ? <div className="no-data"> Client has no Orders! </div> :
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={currentClientOrdersColumns}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={currentClientOrdersColumns} rows={currentClientOrders.map(order => {
                            order.pricelist = order.pricelist_name
                            order.payment_method = order.payment_method_name
                            return order
                        })}/>
                    </TableBody>
                </Table>}
            </div>
        </Page>
    </>)
}

export default ShowClient