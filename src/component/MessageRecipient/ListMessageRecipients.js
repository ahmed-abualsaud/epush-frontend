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
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"


const ListMessageRecipients = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar",
        "message_id",
        "message",
        "message_group_id",
        "message_group",
        "message_group_recipient",
        "message_group_recipient_id",
        "email_verified_at",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [messageRecipients, setMessageRecipients] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessageRecipients, searchMessageRecipient } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msgrcip = []
        if (isEmpty(searchParams)) {
            msgrcip = await listMessageRecipients(perPage)
        } else {
            msgrcip = await searchMessageRecipient(perPage, searchParams.column, searchParams.value)
        }
        setMessageRecipients(msgrcip)
        setColumns(msgrcip?.data[0] ? ["group_name", "number", "attributes", "message", ...Object.keys(msgrcip?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        )] : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msgrcip = {}
        if (isEmpty(searchParams)) {
            msgrcip = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            msgrcip = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(msgrcip)) setMessageRecipients(msgrcip)
    }

    const searchEntityColumn = async (column, value) => {
        const msgrcip = await searchMessageRecipient(10, column, value)
        if (msgrcip) setMessageRecipients(msgrcip)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let msgrcip = []
        if (isEmpty(searchParams)) {
            msgrcip = await listMessageRecipients(1000000000000)
        } else {
            msgrcip = await searchMessageRecipient(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageRecipients(msgrcip)
    }

    return (
        ! isEmpty(messageRecipients) && 
        (
        <div className="component-container">
            <h1 className="content-header">All MessageRecipients</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageRecipients.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageRecipients.data.map(messageRecipient => {
                        messageRecipient.number = messageRecipient.message_group_recipient?.number ?? "NULL"
                        messageRecipient.attributes = messageRecipient.message_group_recipient?.attributes ?? "NULL"
                        messageRecipient.group_name = messageRecipient.message_group_recipient?.message_group?.name ?? "NULL"
                        messageRecipient.message = messageRecipient.message?.content ?? "NULL"
                        return messageRecipient
                    })}/>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageRecipients.links[1].url.split("?")[0] + "?take=" + messageRecipients.per_page} numberOfPages={Math.ceil(parseFloat(messageRecipients.total/messageRecipients.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageRecipients.links} perPage={messageRecipients.per_page} total={messageRecipients.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageRecipients.total} perPage={messageRecipients.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMessageRecipients