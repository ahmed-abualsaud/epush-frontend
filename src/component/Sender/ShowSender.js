import { useEffect, useRef, useState } from "react"
import useCoreApi from "../../api/useCoreApi"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadCells from "../../layout/Table/HeadCells"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import HeadRow from "../../layout/Table/HeadRow"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import Page from "../../page/Page"

const ShowSender = ({ sender }) => {

    const excludedColumns = [
        "updated_at", 
        "deleted_at", 
        "id",
        "user_id",
        "client"
    ]

    const filteredColumns = sender ? Object.keys(sender).filter(
        (column) => !excludedColumns.includes(column)
    ) : []

    const { getSenderConnections } = useCoreApi()
    const [senderConnections, setSenderConnections] = useState([])
    const [SenderConnectionColumns, setSenderConnectionColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        const sndcon = (await getSenderConnections(sender.id)).map(con => {
            return {
                country_name: con.smsc.country.name,
                country_code: con.smsc.country.code,
                operator_name: con.smsc.operator.name,
                operator_code: con.smsc.operator.code,
                smsc_name: con.smsc.smsc.name,
                smsc_value: con.smsc.smsc.value,
                // default: con.smsc.default,
                approved: con.approved
            }
        })

        setSenderConnections(sndcon)
        setSenderConnectionColumns(sndcon[0] ? Object.keys(sndcon[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <Page title="General Information">
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
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof sender[col] === "boolean"? sender[col] ? "Yes" : "No" : sender[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <h1 className="content-header">Sender SMS Connections</h1>
            { isEmpty(senderConnections) ? <div className="no-data"> Sender Has No SMS Connections! </div> :
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={SenderConnectionColumns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={SenderConnectionColumns} rows={senderConnections}/>
                </TableBody>
            </Table>}
        </Page>
    )
}

export default ShowSender