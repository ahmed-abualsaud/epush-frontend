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
import useMailApi from "../../../api/useMailApi"


const ListMailSendingHandlers = () =>
{
    const excludedColumns = [

        "id",
        "email",
        "user_id",
        "handler",
        "handler_id",
        "mail_template",
        "mail_template_id",
        "updated_at", 
        "deleted_at",
    ]

    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})
    const [mailSendingHandlers, setMailSendingHandlers] = useState([])

    const { listMailSendingHandlers, searchMailSendingHandler } = useMailApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let mailhndl = []
        if (isEmpty(searchParams)) {
            mailhndl = await listMailSendingHandlers(perPage)
        } else {
            mailhndl = await searchMailSendingHandler(perPage, searchParams.column, searchParams.value)
        }

        setMailSendingHandlers(mailhndl)
        setColumns(["template_name", "template_content", "subject", "endpoint", "description", "handler_name", ...(mailhndl?.data[0] ? Object.keys(mailhndl?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let mailhndl = {}
        if (isEmpty(searchParams)) {
            mailhndl = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            mailhndl = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(mailhndl)) setMailSendingHandlers(mailhndl)
    }

    const searchEntityColumn = async (column, value) => {
        const mailhndl = await searchMailSendingHandler(10, column, value)
        if (mailhndl) setMailSendingHandlers(mailhndl)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let mailhndl = []
        if (isEmpty(searchParams)) {
            mailhndl = await listMailSendingHandlers(1000000000000)
        } else {
            mailhndl = await searchMailSendingHandler(1000000000000, searchParams.column, searchParams.value)
        }
        setMailSendingHandlers(mailhndl)
    }

    const addMailSendingHandlerHandler = () => {
        navigate("mail-management", "add-mail-sending-handler")
    }

    const deleteMailSendingHandlerHandler = (mailSendingHandler, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-mail-sending-handler", mailSendingHandler, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(mailSendingHandlers) && 
        (
        <div className="component-container">
            <h1 className="content-header">All Mails</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={mailSendingHandlers.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addMailSendingHandlerHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={mailSendingHandlers.data.map(mailSendingHandler => {
                        mailSendingHandler.subject = mailSendingHandler.mail_template?.subject
                        mailSendingHandler.template_name = mailSendingHandler.mail_template?.name
                        mailSendingHandler.template_content = mailSendingHandler.mail_template?.template
                        mailSendingHandler.handler_name = mailSendingHandler.handler.handler_name ?? mailSendingHandler.handler.name
                        mailSendingHandler.endpoint = mailSendingHandler.handler.handler_endpoint ?? mailSendingHandler.handler.endpoint
                        mailSendingHandler.description = mailSendingHandler.handler.handler_description ?? mailSendingHandler.handler.description
                        return mailSendingHandler
                    })}>
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMailSendingHandlerHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={mailSendingHandlers.links[1].url.split("?")[0] + "?take=" + mailSendingHandlers.per_page} numberOfPages={Math.ceil(parseFloat(mailSendingHandlers.total/mailSendingHandlers.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={mailSendingHandlers.links} perPage={mailSendingHandlers.per_page} total={mailSendingHandlers.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={mailSendingHandlers.total} perPage={mailSendingHandlers.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMailSendingHandlers