import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../layout/TableOperation/ShowAll"
import { navigate } from "../../setup/navigator"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"


const ListSendersConnections = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "sender_id",
        "smsc_id",
        "sender",
        "smsc"

    ]

    const [sendersConnections, setSendersConnections] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listSendersConnections, searchSenderConnection } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let sndcon = []
        if (isEmpty(searchParams)) {
            sndcon = await listSendersConnections(perPage)
        } else {
            sndcon = await searchSenderConnection(perPage, searchParams.column, searchParams.value)
        }
         
        setSendersConnections(sndcon)

        let filteredColumns = ["company_name", "sender_name", "sender_approved", "country_name", "country_code", "operator_name", "operator_code", "smsc_name", "smsc_value"]
        filteredColumns.push(...(sndcon?.data[0] ? Object.keys(sndcon?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : []))
        setColumns(filteredColumns)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let sndcon = {}
        if (isEmpty(searchParams)) {
            sndcon = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            sndcon = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(sndcon)) setSendersConnections(sndcon)
    }

    const searchEntityColumn = async (column, value) => {
        const sndcon = await searchSenderConnection(10, column, value)
        if (sndcon) setSendersConnections(sndcon)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let sndcon = []
        if (isEmpty(searchParams)) {
            sndcon = await listSendersConnections(1000000000000)
        } else {
            sndcon = await searchSenderConnection(1000000000000, searchParams.column, searchParams.value)
        }
        setSendersConnections(sndcon)
    }

    const addSenderConnectionHandler = () => {
        navigate("content", "add-sender-connection")
    }

    const showSenderConnectionHandler = (senderConnection) => {
        navigate("content", "show-sender-connection", senderConnection)
    }

    const updateSenderConnectionHandler = (senderConnection) => {
        navigate("content", "edit-sender-connection", senderConnection)
    }

    const deleteSenderConnectionHandler = (senderConnection, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-sender-connection", senderConnection, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(sendersConnections) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All Senders Connections</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={sendersConnections.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSenderConnectionHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={sendersConnections.data.map(senderConnection => {
                        senderConnection.company_name = senderConnection.sender?.client?.company_name ?? "NULL"
                        senderConnection.sender_name = senderConnection.sender?.name ?? "NULL"
                        senderConnection.sender_approved = senderConnection.sender?.approved ?? "NULL"
                        senderConnection.country_name = senderConnection.smsc?.country?.name ?? "NULL"
                        senderConnection.country_code = senderConnection.smsc?.country?.code ?? "NULL"
                        senderConnection.operator_name = senderConnection.smsc?.operator?.name ?? "NULL"
                        senderConnection.operator_code = senderConnection.smsc?.operator?.code ?? "NULL"
                        senderConnection.smsc_name = senderConnection.smsc?.smsc?.name ?? "NULL"
                        senderConnection.smsc_value = senderConnection.smsc?.smsc?.value ?? "NULL"
                        return senderConnection
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSenderConnectionHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSenderConnectionHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSenderConnectionHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={sendersConnections.links[1].url.split("?")[0] + "?take=" + sendersConnections.per_page} numberOfPages={Math.ceil(parseFloat(sendersConnections.total/sendersConnections.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={sendersConnections.links} perPage={sendersConnections.per_page} total={sendersConnections.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={sendersConnections.total} perPage={sendersConnections.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListSendersConnections