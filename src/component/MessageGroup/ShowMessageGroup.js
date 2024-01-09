import { useEffect, useRef, useState } from "react"
import useAxiosApi from "../../api/Api"
import useCoreApi from "../../api/useCoreApi"
import Page from "../../page/Page"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
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
import Export from "../../layout/TableOperation/Export"

const ShowMessageGroup = ({ messageGroup }) => {

    const { sendGetRequest } = useAxiosApi()
    const { getMessageGroupRecipients } = useCoreApi()

    const [messageGroupRecipients, setMessageGroupRecipients] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const msgrcp = await getMessageGroupRecipients(messageGroup.id, perPage)
        if (msgrcp) setMessageGroupRecipients(msgrcp)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const execludedColumns = ["id", "user_id", "updated_at", "deleted_at", "recipients", "message_group_id", "client"]
    const filteredColumns = messageGroup ? Object.keys(messageGroup).filter(column => ! execludedColumns.includes(column)) : []

    const handleGetPage = async (pageUrl) => {
        let rcp = await sendGetRequest(pageUrl)
        if (! isEmpty(rcp)) setMessageGroupRecipients(rcp)
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
                    {filteredColumns.map((col) => (
                        <tr>
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof messageGroup[col] === "boolean"? messageGroup[col] ? "Yes" : "No" : messageGroup[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>

            <h1 className="content-header mt-5">Recipients Information</h1>

            {isEmpty(messageGroupRecipients) ? <div className="no-data">The current group has no recipients</div> : 
                <div>
                    <div className="d-flex justify-content-center m-3" style={{fontSize: "20px"}}>Total Number of Recipients = {messageGroupRecipients.total}</div>
                    <div className="d-flex justify-content-center">
                        <Export columns={['number', 'attributes']} rows={messageGroupRecipients.data}/>
                    </div>
                    <Table>
                        <TableHead>
                            <HeadRow>
                                <HeadCells columns={['number', 'attributes']}/>
                            </HeadRow>
                        </TableHead>
                        <TableBody>
                            <DataRows columns={['number', 'attributes']} rows={messageGroupRecipients.data}/>
                        </TableBody>
                    </Table>

                    <PaginationContainer>
                        <PageInput url={messageGroupRecipients.links[1].url.split("?")[0] + "?take=" + messageGroupRecipients.per_page} numberOfPages={Math.ceil(parseFloat(messageGroupRecipients.total/messageGroupRecipients.per_page))} setPageHandler={handleGetPage} />
                        <Paginator links={messageGroupRecipients.links} perPage={messageGroupRecipients.per_page} total={messageGroupRecipients.total} getPageHandler={ handleGetPage }/>
                        <PerPageDropList perPageHandler={ setup }/>
                        <PaginationInfo total={messageGroupRecipients.total} perPage={messageGroupRecipients.per_page}/>
                    </PaginationContainer>
                </div>
            }
        </Page>
    )
}

export default ShowMessageGroup