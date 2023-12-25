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
import Page from "../../page/Page"


const ListUnapprovedMessages = () =>
{
    const [columns, setColumns] = useState([])
    const [messages, setMessages] = useState([])
    const [searchParams, setSearchParams] = useState({})
    const [approvedMessages, setApprovedMessages] = useState([])

    const { search } = useSearchApi()
    const { updateMessage } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msg = []
        if (isEmpty(searchParams)) {
            let criteria = "approved = false"
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
        let criteria = "approved = false And " + column + " LIKE '%" + value + "%'"
        const msg = await search("message", criteria, 10)
        if (msg) setMessages(msg)
        setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "approved = false And " + criteria
        const msg = await search("message", criteria, 10)
        if (msg) setMessages(msg)
        setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await search("message", "approved = false", 1000000000000)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setMessages(msg)
    }

    const showMessageHandler = (message) => {
        navigate("content", "show-message", message)
    }

    const updateMessageHandler = async (message) => {
        let msg = await updateMessage(message.id, {approved: true})

        if (isEmpty(msg)) {
            showAlert("Message Approvement Failed")
            return
        }

        setApprovedMessages([...approvedMessages, msg.id])
        showAlert("Message Approved Successfully")
    }

    const deleteMessageHandler = (message, onDelete) => {
        navigate("modal-content", "delete-message", message, onDelete)
    }

    return (
        ! isEmpty(messages) && 
        (
        <Page title="Unapproved Messages">
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
                    <DataRows columns={columns} rows={messages.data.filter(message => ! approvedMessages.includes(message.id)).map(message => {
                        message.company_name = message.sender?.client?.company_name ?? message.company_name ?? "NULL"
                        message.sender_name = message.sender?.name ?? message.sender_name ?? "NULL"
                        message.language = message.language?.name ?? "NULL"
                        return message
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageHandler)}
                        {withOperationCellParameters(OperationRowCell, "operationFunction", updateMessageHandler, {
                            children: <i style={{color: "#FFBB00"}} class="fas fa-check-double"></i>
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

export default ListUnapprovedMessages