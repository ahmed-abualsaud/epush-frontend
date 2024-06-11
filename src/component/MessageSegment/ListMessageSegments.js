import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty, roleExists } from "../../utils/helper"
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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"


const ListMessageSegments = () =>
{
    const [columns, setColumns] = useState([])
    const [authUser, setAuthUser] = useState({})
    const [messageSegments, setMessageSegments] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listMessageSegments, searchMessageSegment } = useCoreApi()
    const { sendGetRequest, sendPostRequest, getAuthenticatedUser } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        setAuthUser(getAuthenticatedUser())

        let msgmnt = []
        if (isEmpty(searchParams)) {
            msgmnt = await listMessageSegments(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgmnt = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            msgmnt = await searchMessageSegment(perPage, searchParams.column, searchParams.value)
        }
         
        setMessageSegments(msgmnt)
        setColumns(["message", "segment_number", "segment_content", "created_at"])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msgmnt = {}
        if (isEmpty(searchParams)) {
            msgmnt = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            let params = {...searchParams}
            if (roleExists(authUser.roles, "partner")) {
                params.partner_id = authUser.user.id
            }
            msgmnt = await sendPostRequest(pageUrl, params)
        }
        if (! isEmpty(msgmnt)) setMessageSegments(msgmnt)
    }

    const searchEntityColumn = async (column, value) => {
        const msgmnt = await searchMessageSegment(10, column, value)
        if (msgmnt) setMessageSegments(msgmnt)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const msgmnt = await search("message_segment", criteria, 10)
        if (msgmnt) setMessageSegments(msgmnt)
        setSearchParams({entity: encodeString("message_segment"), criteria: encodeString(criteria), enti: "message_segment", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msgmnt = []
        if (isEmpty(searchParams)) {
            msgmnt = await listMessageSegments(1000000000000)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgmnt = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        else {
            msgmnt = await searchMessageSegment(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageSegments(msgmnt)
    }

    return (
        ! isEmpty(messageSegments) && 
        (
        <Page title="MessageSegments">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageSegments.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageSegments.data.map(messageSegment => {
                        messageSegment.message = messageSegment.message?.content ?? "NULL"
                        return messageSegment
                    })}/>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageSegments.links[1].url.split("?")[0] + "?take=" + messageSegments.per_page} numberOfPages={Math.ceil(parseFloat(messageSegments.total/messageSegments.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageSegments.links} perPage={messageSegments.per_page} total={messageSegments.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageSegments.total} perPage={messageSegments.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListMessageSegments