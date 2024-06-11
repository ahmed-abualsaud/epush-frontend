import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty, getDatetimeString, roleExists } from "../../utils/helper"
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
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"
import OperationRowCell from "../../layout/TableOperation/OperationRowCell"
import { showAlert } from "../../utils/validator"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import { render } from "@testing-library/react"
import Page from "../../page/Page"


const ListScheduledMessages = () =>
{
    const [columns, setColumns] = useState([])
    const [messages, setMessages] = useState([])
    const [authUser, setAuthUser] = useState({})
    const [searchParams, setSearchParams] = useState({})
    const [UnscheduledMessages, setUnscheduledMessages] = useState([])

    const { search } = useSearchApi()
    const { updateMessage } = useCoreApi()
    const { sendGetRequest, sendPostRequest, getAuthenticatedUser } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let user = getAuthenticatedUser()
        setAuthUser(user)

        let msg = []
        if (isEmpty(searchParams)) {
            let criteria = "scheduled_at >= '" + getDatetimeString() + "'"
            if (roleExists(user.roles, "partner")) {
                criteria += " AND partner_id = " + user.user.id
            }
            setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
            msg = await search("message", criteria, perPage)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, perPage)
        }
         
        setMessages(msg)
        setColumns(["company_name", "sender_name", "content", "notes", "approved", "single_message_cost", "total_cost", "number_of_segments", "number_of_recipients", "language", "sent_at", "sender_ip", "scheduled_at", "created_at"])
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
        let criteria = "scheduled_at >= '" + getDatetimeString() + "' And " + column +  ((column === "approved") ? (" = " + (["true", "yes", "1"].includes(value) ? "true" : "false")) : (" LIKE '%" + value + "%'"))
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const msg = await search("message", criteria, 10)
        if (msg) setMessages(msg)
        setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "scheduled_at >= '" + getDatetimeString() + "' And " + criteria
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const msg = await search("message", criteria, 10)
        if (msg) setMessages(msg)
        setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await search("message", "scheduled_at >= '" + getDatetimeString() + "'", 1000000000000)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setMessages(msg)
    }

    const showMessageHandler = (message) => {
        navigate("content", "show-message", message)
    }

    const sendMessageHandler = async (message) => {
        let msg = await updateMessage(message.id, {scheduled_at: getDatetimeString()})

        if (isEmpty(msg)) {
            showAlert("Message Pushing Failed")
            return
        }

        setUnscheduledMessages([...UnscheduledMessages, msg.id])
        showAlert("Message Pushed Successfully")
    }

    const unscheduleMessageHandler = async (message) => {
        navigate("modal-content", "cancel-scheduled-message", message.id, () => setUnscheduledMessages([...UnscheduledMessages, message.id]))
    }

    const deleteMessageHandler = (message, onDelete) => {
        render("modal-content", "delete-message", message, onDelete)
    }

    return (
        ! isEmpty(messages) && 
        (
        <Page title="Scheduled Messages">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messages.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messages.data.filter(message => ! UnscheduledMessages.includes(message.id)).map(message => {
                        message.company_name = message.sender?.client?.company_name ?? message.company_name ?? "NULL"
                        message.sender_name = message.sender?.name ?? message.sender_name ?? "NULL"
                        message.language = message.language?.name ?? message.language ?? "NULL"
                        return message
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageHandler)}
                        {withOperationCellParameters(OperationRowCell, "operationFunction", sendMessageHandler, {
                            children: <i class="fas fa-paper-plane"></i>
                        })}
                        {withOperationCellParameters(OperationRowCell, "operationFunction", unscheduleMessageHandler, {
                            popup: true,
                            children: <i style={{color: "brown"}} class="fas fa-calendar-xmark"></i>
                        })}
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
        </Page>
        )
    )
}

export default ListScheduledMessages