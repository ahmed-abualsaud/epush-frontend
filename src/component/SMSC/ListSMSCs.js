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
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"


const ListSMSCs = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "user_id"
    ]

    const [smscs, setSMSCs] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listSMSCs, searchSMSC } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSMSCs(perPage)
        } else {
            clt = await searchSMSC(perPage, searchParams.column, searchParams.value)
        }
         
        setSMSCs(clt)
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
        if (! isEmpty(clt)) setSMSCs(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchSMSC(10, column, value)
        if (clt) setSMSCs(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSMSCs(1000000000000)
        } else {
            clt = await searchSMSC(1000000000000, searchParams.column, searchParams.value)
        }
        setSMSCs(clt)
    }

    const addSMSCHandler = () => {
        navigate("content", "add-smsc")
    }

    const showSMSCHandler = (smsc) => {
        navigate("content", "show-smsc", smsc)
    }

    const updateSMSCHandler = (smsc) => {
        navigate("content", "edit-smsc", smsc)
    }

    const deleteSMSCHandler = (smsc, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-smsc", smsc, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(smscs) && 
        (
        <div className="component-container">
            <h1 className="content-header">All SMSCs</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={smscs.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSMSCHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={smscs.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSMSCHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSMSCHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSMSCHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={smscs.links[1].url.split("?")[0] + "?take=" + smscs.per_page} numberOfPages={Math.ceil(parseFloat(smscs.total/smscs.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={smscs.links} perPage={smscs.per_page} total={smscs.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={smscs.total} perPage={smscs.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListSMSCs