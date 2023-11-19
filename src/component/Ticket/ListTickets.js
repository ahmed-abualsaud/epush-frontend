import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../layout/TableOperation/ShowAll"
import { navigate, render } from "../../setup/navigator"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"
import useTicketApi from "../../api/useTicketApi"
import SimpleDropList from "../../layout/Shared/SimpleDropList"
import { getElement } from "../../utils/dom"


const ListTickets = () =>
{
    const ticketStatus = [
        "Initiated",
        "Processing",
        "Completed",
        "Closed",
    ]
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "user_id",
        "status",
    ]

    const [columns, setColumns] = useState([])
    const [tickets, setTickets] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listTickets, searchTicket } = useTicketApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listTickets(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            opr = await searchTicket(perPage, searchParams.column, searchParams.value)
        }
         
        setTickets(opr)
        setColumns(opr?.data[0] ? [...Object.keys(opr?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ), "current_status"] : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let opr = {}
        if (isEmpty(searchParams)) {
            opr = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            opr = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(opr)) setTickets(opr)
    }

    const searchEntityColumn = async (column, value) => {
        const opr = await searchTicket(10, column, value)
        if (opr) setTickets(opr)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const opr = await search("ticket", criteria, 10)
        if (opr) setTickets(opr)
        setSearchParams({entity: encodeString("ticket"), criteria: encodeString(criteria), enti: "ticket", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listTickets(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            opr = await searchTicket(1000000000000, searchParams.column, searchParams.value)
        }
        setTickets(opr)
    }

    const showTicketHandler = (ticket) => {
        navigate("content", "show-ticket", ticket)
    }

    const updateTicketHandler = async (ticket, data) => {
        getElement("list-tickets-modal").click()
        render("modal-content", "edit-ticket", ticket, data)
    }

    const deleteTicketHandler = (ticket, onDelete) => {
        navigate("modal-content", "delete-ticket", ticket, onDelete)
    }

    const renderStatus = (ticket, status) => {
        const sts = [status, ...ticketStatus.filter(sts => sts !== status)]
        return <SimpleDropList selectName={status} options={sts} onSelect={(sts) => updateTicketHandler(ticket, {status: sts})}/>
    }

    return (
        ! isEmpty(tickets) && 
        (
        <Page title="Tickets">
            <a id="list-tickets-modal" className="d-none" href="#popup"></a>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={["first_name", "last_name", "email", "phone", "company_name", "sender_name", "content", "notes", "status", "created_at"]} rows={tickets.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={tickets.data.map(ticket => {
                        ticket.current_status = () => renderStatus(ticket, ticket.status)
                        return ticket
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showTicketHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteTicketHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={tickets.links[1].url.split("?")[0] + "?take=" + tickets.per_page} numberOfPages={Math.ceil(parseFloat(tickets.total/tickets.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={tickets.links} perPage={tickets.per_page} total={tickets.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={tickets.total} perPage={tickets.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListTickets