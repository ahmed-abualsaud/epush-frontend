import { useEffect, useRef, useState } from "react"
import useCoreApi from "../../api/useCoreApi"
import Page from "../../page/Page"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import Export from "../../layout/TableOperation/Export"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadRow from "../../layout/Table/HeadRow"
import HeadCells from "../../layout/Table/HeadCells"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import useAxiosApi from "../../api/Api"

const ShowMessage = ({ message }) => {

    const { sendGetRequest } = useAxiosApi()
    const { getMessageRecipients } = useCoreApi()

    const [messageRecipients, setMessageRecipients] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const msgrcp = await getMessageRecipients(message.id, perPage)
        if (msgrcp) setMessageRecipients(msgrcp)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "order_id",
        "sender_id",
        "order",
        "sender",
        "recipients",
        "segments",
        "message_id",
        "message_language_id",
        "message_group_recipient",
        "message_group_recipient_id",
    ]

    const filteredColumns = message ? Object.keys(message).filter(
        (column) => ! excludedColumns.includes(column)
    ) : []

    const segmentsColumns = Object.keys(message['segments'].length > 0 ? message['segments'][0] : []).filter(
        (column) => ! excludedColumns.includes(column)
    )

    const handleGetPage = async (pageUrl) => {
        let rcp = await sendGetRequest(pageUrl)
        if (! isEmpty(rcp)) setMessageRecipients(rcp)
    }

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
                    {filteredColumns?.map((col) => (
                        <tr>
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof message[col] === "boolean"? message[col] ? "Yes" : "No" : message[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <h1 className="content-header">Segments Information</h1>
            {isEmpty(message['segments'])? <div className="no-data">Message has no segments</div>:
                <div>
                    <div className="d-flex justify-content-center m-3" style={{fontSize: "20px"}}>Total Number of Segments = {message['segments'].length}</div>
                    <table className="fl-table">
                        <thead>
                            <tr>
                                {segmentsColumns.map(segmentColumn =>
                                    <th>{snakeToBeautifulCase(segmentColumn)}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {message['segments'].map(segment =>
                                <tr>
                                    {segmentsColumns?.map((col) => (
                                        <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof segment[col] === "boolean"? segment[col] ? "Yes" : "No" : segment[col] ?? "NULL"}</td>
                                    ))}
                                </tr>
                            )}
                            <tr key="last-row">
                                <td className="last-row" colSpan={segmentsColumns.length}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            <h1 className="content-header">Recipients Information</h1>
            {isEmpty(messageRecipients.data)? <div className="no-data">Message has no recipients</div>:
                <div>
                    <div className="d-flex justify-content-center m-3" style={{fontSize: "20px"}}>Total Number of Recipients = {messageRecipients.total}</div>
                    <div className="d-flex justify-content-center">
                        <Export columns={['status', 'number', 'attributes']} rows={messageRecipients.data}/>
                    </div>

                    <Table>
                        <TableHead>
                            <HeadRow>
                                <HeadCells columns={['status', 'number', 'attributes']}/>
                            </HeadRow>
                        </TableHead>
                        <TableBody>
                            <DataRows columns={['status', 'number', 'attributes']} rows={messageRecipients.data}/>
                        </TableBody>
                    </Table>

                    <PaginationContainer>
                        <PageInput url={messageRecipients.links[1].url.split("?")[0] + "?take=" + messageRecipients.per_page} numberOfPages={Math.ceil(parseFloat(messageRecipients.total/messageRecipients.per_page))} setPageHandler={handleGetPage} />
                        <Paginator links={messageRecipients.links} perPage={messageRecipients.per_page} total={messageRecipients.total} getPageHandler={ handleGetPage }/>
                        <PerPageDropList perPageHandler={ setup }/>
                        <PaginationInfo total={messageRecipients.total} perPage={messageRecipients.per_page}/>
                    </PaginationContainer>
                </div>
            }
        </Page>
    )
}

export default ShowMessage