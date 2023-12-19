import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import { useSelector } from "react-redux"
import Page from "../../page/Page"


const ListClientMessageRecipients = () =>
{
    const [columns, setColumns] = useState([])
    const [messageRecipients, setMessageRecipients] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msgrcip = []
        if (isEmpty(searchParams)) {
            let criteria = "user_id = " + user?.user?.id
            setSearchParams({entity: encodeString("message_recipient"), criteria: encodeString(criteria), enti: "message_recipient", crit: criteria})
            msgrcip = await search("message_recipient", criteria, perPage)
        } else {
            msgrcip = await search(searchParams.enti, searchParams.crit, perPage)
        }
        setMessageRecipients(msgrcip)
        setColumns(["group_name", "number", "message", "status", "created_at"])
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
        let criteria = "user_id = " + user?.user?.id + " And " + column + " LIKE '%" + value + "%'"
        const msgrcip = await search("message_recipient", criteria, 10)
        if (msgrcip) setMessageRecipients(msgrcip)
        setSearchParams({entity: encodeString("message_recipient"), criteria: encodeString(criteria), enti: "message_recipient", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "user_id = " + user?.user?.id + " And " + criteria
        const msgrcip = await search("message_recipient", criteria, 10)
        if (msgrcip) setMessageRecipients(msgrcip)
        setSearchParams({entity: encodeString("message_recipient"), criteria: encodeString(criteria), enti: "message_recipient", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msgrcip = []
        if (isEmpty(searchParams)) {
            msgrcip = await search("message_recipient", "user_id = " + user?.user?.id, 1000000000000)
        } else {
            msgrcip = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setMessageRecipients(msgrcip)
    }

    return (
        ! isEmpty(messageRecipients) && 
        (
        <div>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
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
                        messageRecipient.group_name = messageRecipient.message_group_recipient?.message_group?.name ?? messageRecipient.group_name ?? "NULL"
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

export default ListClientMessageRecipients