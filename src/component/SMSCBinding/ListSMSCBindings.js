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


const ListSMSCBindings = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "country_id",
        "operator_id",
        "smsc_id",
        "country",
        "operator",
        "smsc"
    ]

    const includedColumns = [
        "country_name", 
        "country_code", 
        "operator_name", 
        "operator_code", 
        "smsc_name", 
        "smsc_value"
    ]

    const [smscBindings, setSMSCBindings] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listSMSCBindings, searchSMSCBinding } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSMSCBindings(perPage)
        } else {
            clt = await searchSMSCBinding(perPage, searchParams.column, searchParams.value)
        }
         
        setSMSCBindings(clt)

        let filteredColumns = includedColumns
        filteredColumns.push(...(clt?.data[0] ? Object.keys(clt?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : []))
        setColumns(filteredColumns)
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
        if (! isEmpty(clt)) setSMSCBindings(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchSMSCBinding(10, column, value)
        if (clt) setSMSCBindings(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSMSCBindings(1000000000000)
        } else {
            clt = await searchSMSCBinding(1000000000000, searchParams.column, searchParams.value)
        }
        setSMSCBindings(clt)
    }

    const addSMSCBindingHandler = () => {
        navigate("content", "add-smsc-binding")
    }

    const showSMSCBindingHandler = (smscBinding) => {
        navigate("content", "show-smsc-binding", smscBinding)
    }

    const updateSMSCBindingHandler = (smscBinding) => {
        navigate("content", "edit-smsc-binding", smscBinding)
    }

    const deleteSMSCBindingHandler = (smscBinding, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-smsc-binding", smscBinding, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(smscBindings) && 
        (
        <div className="component-container">
            <h1 className="content-header">All SMSC Bindings</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={smscBindings.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSMSCBindingHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={smscBindings.data.map( smscBinding => {
                        smscBinding.country_name = smscBinding?.country.name ?? "NULL"
                        smscBinding.country_code = smscBinding?.country.code ?? "NULL"
                        smscBinding.operator_name = smscBinding?.operator.name ?? "NULL"
                        smscBinding.operator_code = smscBinding?.operator.code ?? "NULL"
                        smscBinding.smsc_name = smscBinding?.smsc.name ?? "NULL"
                        smscBinding.smsc_value = smscBinding?.smsc.value ?? "NULL"
                        return smscBinding
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSMSCBindingHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSMSCBindingHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSMSCBindingHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={smscBindings.links[1].url.split("?")[0] + "?take=" + smscBindings.per_page} numberOfPages={Math.ceil(parseFloat(smscBindings.total/smscBindings.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={smscBindings.links} perPage={smscBindings.per_page} total={smscBindings.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={smscBindings.total} perPage={smscBindings.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListSMSCBindings