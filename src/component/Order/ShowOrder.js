import { useEffect, useRef, useState } from "react"
import useExpenseApi from "../../api/useExpenseApi"

const ShowOrder = ({ order }) => {

    const execludedColumns = ["client", "pricelist", "payment_method", "updated_at", "websites", "sales", "businessfield", "deleted_at"]

    const [ currentOrder, setCurrentOrder] = useState([])

    const orderColumns = currentOrder ? Object.keys(currentOrder).filter(column => ! execludedColumns.includes(column)) : []
    const clientColumns = currentOrder?.client ? Object.keys(currentOrder.client).filter(column => ! execludedColumns.includes(column)) : []
    const pricelistColumns = currentOrder?.pricelist ? Object.keys(currentOrder.pricelist).filter(column => ! execludedColumns.includes(column)) : []

    const { getOrder } = useExpenseApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const ord = await getOrder(order.id)
        if (ord) setCurrentOrder(ord)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (<>
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
                    {orderColumns.map((column) => (
                        <tr>
                            <td style={{fontSize: "22px"}}>{column}</td>
                            <td style={{fontSize: "22px"}} key={ column + "-show-user-info" }>{ typeof currentOrder[column] === "boolean"? currentOrder[column] ? "Yes" : "No" : currentOrder[column] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="component-container my-5">
            <h1 className="content-header">Client Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    {clientColumns.map((column) => (
                        <tr>
                            <td style={{fontSize: "22px"}}>{column}</td>
                            <td style={{fontSize: "22px"}} key={ column + "-show-user-info" }>{ typeof currentOrder.client[column] === "boolean"? currentOrder.client[column] ? "Yes" : "No" : currentOrder.client[column] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="component-container my-5">
            <h1 className="content-header">Pricelist Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    {pricelistColumns.map((column) => (
                        <tr>
                            <td style={{fontSize: "22px"}}>{column}</td>
                            <td style={{fontSize: "22px"}} key={ column + "-show-user-info" }>{ typeof currentOrder.pricelist[column] === "boolean"? currentOrder.pricelist[column] ? "Yes" : "No" : currentOrder.pricelist[column] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}

export default ShowOrder