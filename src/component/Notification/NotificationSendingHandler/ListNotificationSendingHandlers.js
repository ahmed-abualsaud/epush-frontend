import PageInput from "../../../layout/Pagination/PageInput"
import Paginator from "../../../layout/Pagination/Paginator"
import useAxiosApi from "../../../api/Api"
import Search from '../../../layout/TableOperation/Search'
import Export from '../../../layout/TableOperation/Export'
import { isEmpty } from "../../../utils/helper"
import PerPageDropList from "../../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../../layout/TableOperation/ShowAll"
import { navigate } from "../../../setup/navigator"
import OperationContainer from "../../../layout/TableOperation/OperationContainer"
import DeleteRowCell from "../../../layout/TableOperation/DeleteRowCell"
import DataRows from "../../../layout/Table/DataRows"
import TableBody from "../../../layout/Table/TableBody"
import HeadCells from "../../../layout/Table/HeadCells"
import AddRowCell from "../../../layout/TableOperation/AddRowCell"
import withOperationCellParameters from "../../../HOC/withOperationCellParameters"
import PaginationInfo from "../../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../../layout/Pagination/PaginationContainer"
import HeadRow from "../../../layout/Table/HeadRow"
import TableHead from "../../../layout/Table/TableHead"
import Table from "../../../layout/Table/Table"
import useNotificationApi from "../../../api/useNotificationApi"


const ListNotificationSendingHandlers = () =>
{
    const excludedColumns = [

        "id", 
        "phone",
        "user_id",
        "handler",
        "handler_id",
        "notification_template",
        "notification_template_id",
        "updated_at", 
        "deleted_at",
    ]

    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})
    const [notificationSendingHandlers, setNotificationSendingHandlers] = useState([])

    const { listNotificationSendingHandlers, searchNotificationSendingHandler } = useNotificationApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let notfhndl = []
        if (isEmpty(searchParams)) {
            notfhndl = await listNotificationSendingHandlers(perPage)
        } else {
            notfhndl = await searchNotificationSendingHandler(perPage, searchParams.column, searchParams.value)
        }

        setNotificationSendingHandlers(notfhndl)
        setColumns(["template_name", "template_content", "subject", "endpoint", "description", "handler_name", ...(notfhndl?.data[0] ? Object.keys(notfhndl?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let notfhndl = {}
        if (isEmpty(searchParams)) {
            notfhndl = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            notfhndl = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(notfhndl)) setNotificationSendingHandlers(notfhndl)
    }

    const searchEntityColumn = async (column, value) => {
        const notfhndl = await searchNotificationSendingHandler(10, column, value)
        if (notfhndl) setNotificationSendingHandlers(notfhndl)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let notfhndl = []
        if (isEmpty(searchParams)) {
            notfhndl = await listNotificationSendingHandlers(1000000000000)
        } else {
            notfhndl = await searchNotificationSendingHandler(1000000000000, searchParams.column, searchParams.value)
        }
        setNotificationSendingHandlers(notfhndl)
    }

    const addNotificationSendingHandlerHandler = () => {
        navigate("notification-management", "add-notification-sending-handler")
    }

    const deleteNotificationSendingHandlerHandler = (notificationSendingHandler, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-notification-sending-handler", notificationSendingHandler, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(notificationSendingHandlers) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All Notifications</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={notificationSendingHandlers.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addNotificationSendingHandlerHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={notificationSendingHandlers.data.map(notificationSendingHandler => {
                        notificationSendingHandler.subject = notificationSendingHandler.notification_template?.subject
                        notificationSendingHandler.template_name = notificationSendingHandler.notification_template?.name
                        notificationSendingHandler.template_content = notificationSendingHandler.notification_template?.template
                        notificationSendingHandler.handler_name = notificationSendingHandler.handler.handler_name ?? notificationSendingHandler.handler.name
                        notificationSendingHandler.endpoint = notificationSendingHandler.handler.handler_endpoint ?? notificationSendingHandler.handler.endpoint
                        notificationSendingHandler.description = notificationSendingHandler.handler.handler_description ?? notificationSendingHandler.handler.description
                        return notificationSendingHandler
                    })}>
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteNotificationSendingHandlerHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={notificationSendingHandlers.links[1].url.split("?")[0] + "?take=" + notificationSendingHandlers.per_page} numberOfPages={Math.ceil(parseFloat(notificationSendingHandlers.total/notificationSendingHandlers.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={notificationSendingHandlers.links} perPage={notificationSendingHandlers.per_page} total={notificationSendingHandlers.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={notificationSendingHandlers.total} perPage={notificationSendingHandlers.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListNotificationSendingHandlers