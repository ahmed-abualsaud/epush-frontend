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


const ListClientTickets = () =>
{
    const [columns, setColumns] = useState([])
    const [tickets, setTickets] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msg = []
        if (isEmpty(searchParams)) {
            let criteria = "user_id = " + user?.user?.id
            setSearchParams({entity: encodeString("ticket"), criteria: encodeString(criteria), enti: "ticket", crit: criteria})
            msg = await search("ticket", criteria, perPage)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, perPage)
        }
         
        setTickets(msg)
        setColumns(["first_name", "last_name", "email", "phone", "sender_name", "content", "notes", "status", "created_at"])
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
        if (! isEmpty(msg)) setTickets(msg)
    }

    const searchEntityColumn = async (column, value) => {
        let criteria = "user_id = " + user?.user?.id + " AND " + column + " LIKE '%" + value + "%'"
        const msg = await search("ticket", criteria, 10)
        if (msg) setTickets(msg)
        setSearchParams({entity: encodeString("ticket"), criteria: encodeString(criteria), enti: "ticket", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "user_id = " + user?.user?.id + " AND " + criteria
        const msg = await search("ticket", criteria, 10)
        if (msg) setTickets(msg)
        setSearchParams({entity: encodeString("ticket"), criteria: encodeString(criteria), enti: "ticket", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await search("ticket", "user_id = " + user?.user?.id, 1000000000000)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setTickets(msg)
    }

    return (
        ! isEmpty(tickets) && 
        (
        <div>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={tickets.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={tickets.data}/>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={tickets.links[1].url.split("?")[0] + "?take=" + tickets.per_page} numberOfPages={Math.ceil(parseFloat(tickets.total/tickets.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={tickets.links} perPage={tickets.per_page} total={tickets.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={tickets.total} perPage={tickets.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListClientTickets