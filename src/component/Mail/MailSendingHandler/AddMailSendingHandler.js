import '../../../assets/style/component/handler.css'
import useOrchiApi from "../../../api/useOrchiApi"
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
import DataRows from "../../../layout/Table/DataRows"
import TableBody from "../../../layout/Table/TableBody"
import HeadCells from "../../../layout/Table/HeadCells"
import withOperationCellParameters from "../../../HOC/withOperationCellParameters"
import PaginationInfo from "../../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../../layout/Pagination/PaginationContainer"
import HeadRow from "../../../layout/Table/HeadRow"
import TableHead from "../../../layout/Table/TableHead"
import Table from "../../../layout/Table/Table"
import OperationRowCell from '../../../layout/TableOperation/OperationRowCell'
const AddMailSendingHandler = () => {

    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "handle_group_id",
        "response_attributes",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [handlers, setHandlers] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listHandlers, searchHandler } = useOrchiApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listHandlers(perPage)
        } else {
            clt = await searchHandler(perPage, searchParams.column, searchParams.value)
        }
         
        setHandlers(clt)
        setColumns(clt?.data[0] ? Object.keys(clt?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let clt = {}
        if (isEmpty(searchParams)) {
            clt = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            clt = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(clt)) setHandlers(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchHandler(10, column, value)
        if (clt) setHandlers(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listHandlers(1000000000000)
        } else {
            clt = await searchHandler(1000000000000, searchParams.column, searchParams.value)
        }
        setHandlers(clt)
    }

    const setChosenHandler = (handler) => {
        navigate("mail-management", "add-mail-sending-template", handler)
    }

    return (
        ! isEmpty(handlers) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">Select One of The System Handlers</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={handlers.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <th style={{backgroundColor: "transparent", borderBottom: "1px solid #063F30"}} colSpan={1} key="add">

                        </th>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={handlers.data}>
                        {withOperationCellParameters(OperationRowCell, "operationFunction", setChosenHandler, {
                            children: <div style={{width: "120px", color: "#FFBB00"}}>Select <i class="fas fa-hand-pointer"></i></div>
                        })}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={handlers.links[1].url.split("?")[0] + "?take=" + handlers.per_page} numberOfPages={Math.ceil(parseFloat(handlers.total/handlers.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={handlers.links} perPage={handlers.per_page} total={handlers.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={handlers.total} perPage={handlers.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default AddMailSendingHandler