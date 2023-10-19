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


const ListMessages = () =>
{
    const excludedColumns = [

        "id",
        "user_id",
        "updated_at", 
        "deleted_at", 
        "order_id",
        "sender_id",
        "order",
        "sender",
        "recipients",
        "segments",
        "message_language_id",
    ]

    const [columns, setColumns] = useState([])
    const [messages, setMessages] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessages, searchMessage } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await listMessages(perPage)
        } else {
            msg = await searchMessage(perPage, searchParams.column, searchParams.value)
        }
         
        setMessages(msg)

        let filteredColumns = [
            "company_name", 
            "sender_name",
        ]

        filteredColumns.push(...(msg?.data[0] ? Object.keys(msg?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : []))
    
        setColumns(filteredColumns)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msg = {}
        if (isEmpty(searchParams)) {
            msg = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            msg = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(msg)) setMessages(msg)
    }

    const searchEntityColumn = async (column, value) => {
        const msg = await searchMessage(10, column, value)
        if (msg) setMessages(msg)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await listMessages(1000000000000)
        } else {
            msg = await searchMessage(1000000000000, searchParams.column, searchParams.value)
        }
        setMessages(msg)
    }

    const addMessageHandler = () => {
        navigate("content", "add-message")
    }

    const showMessageHandler = (message) => {
        navigate("content", "show-message", message)
    }

    const deleteMessageHandler = (message, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-message", message, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(messages) && 
        (
        <div className="component-container">
            <h1 className="content-header">All Messages</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messages.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addMessageHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messages.data.map(message => {
                        message.company_name = message.sender?.client?.company_name ?? "NULL"
                        message.sender_name = message.sender?.name ?? "NULL"
                        message.language = message.language?.name ?? "NULL"
                        return message
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMessageHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messages.links[1].url.split("?")[0] + "?take=" + messages.per_page} numberOfPages={Math.ceil(parseFloat(messages.total/messages.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messages.links} perPage={messages.per_page} total={messages.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messages.total} perPage={messages.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMessages