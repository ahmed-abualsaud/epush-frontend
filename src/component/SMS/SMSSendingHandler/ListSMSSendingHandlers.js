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
import useSMSApi from "../../../api/useSMSApi"


const ListSMSSendingHandlers = () =>
{
    const excludedColumns = [

        "id", 
        "phone",
        "user_id",
        "handler",
        "handler_id",
        "sms_template",
        "sms_template_id",
        "updated_at", 
        "deleted_at",
    ]

    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})
    const [smsSendingHandlers, setSMSSendingHandlers] = useState([])

    const { listSMSSendingHandlers, searchSMSSendingHandler } = useSMSApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let smshndl = []
        if (isEmpty(searchParams)) {
            smshndl = await listSMSSendingHandlers(perPage)
        } else {
            smshndl = await searchSMSSendingHandler(perPage, searchParams.column, searchParams.value)
        }

        setSMSSendingHandlers(smshndl)
        setColumns(["template_name", "template_content", "subject", "endpoint", "description", "handler_name", ...(smshndl?.data[0] ? Object.keys(smshndl?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let smshndl = {}
        if (isEmpty(searchParams)) {
            smshndl = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            smshndl = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(smshndl)) setSMSSendingHandlers(smshndl)
    }

    const searchEntityColumn = async (column, value) => {
        const smshndl = await searchSMSSendingHandler(10, column, value)
        if (smshndl) setSMSSendingHandlers(smshndl)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let smshndl = []
        if (isEmpty(searchParams)) {
            smshndl = await listSMSSendingHandlers(1000000000000)
        } else {
            smshndl = await searchSMSSendingHandler(1000000000000, searchParams.column, searchParams.value)
        }
        setSMSSendingHandlers(smshndl)
    }

    const addSMSSendingHandlerHandler = () => {
        navigate("sms-management", "add-sms-sending-handler")
    }

    const deleteSMSSendingHandlerHandler = (smsSendingHandler, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-sms-sending-handler", smsSendingHandler, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(smsSendingHandlers) && 
        (
        <div className="component-container">
            <h1 className="content-header">All SMSs</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={smsSendingHandlers.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addSMSSendingHandlerHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={smsSendingHandlers.data.map(smsSendingHandler => {
                        smsSendingHandler.subject = smsSendingHandler.sms_template?.subject
                        smsSendingHandler.template_name = smsSendingHandler.sms_template?.name
                        smsSendingHandler.template_content = smsSendingHandler.sms_template?.template
                        smsSendingHandler.handler_name = smsSendingHandler.handler.handler_name ?? smsSendingHandler.handler.name
                        smsSendingHandler.endpoint = smsSendingHandler.handler.handler_endpoint ?? smsSendingHandler.handler.endpoint
                        smsSendingHandler.description = smsSendingHandler.handler.handler_description ?? smsSendingHandler.handler.description
                        return smsSendingHandler
                    })}>
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSMSSendingHandlerHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={smsSendingHandlers.links[1].url.split("?")[0] + "?take=" + smsSendingHandlers.per_page} numberOfPages={Math.ceil(parseFloat(smsSendingHandlers.total/smsSendingHandlers.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={smsSendingHandlers.links} perPage={smsSendingHandlers.per_page} total={smsSendingHandlers.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={smsSendingHandlers.total} perPage={smsSendingHandlers.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListSMSSendingHandlers