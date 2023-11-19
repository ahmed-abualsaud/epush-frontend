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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"


const ListSMSCBindings = () =>
{
    const [smscBindings, setSMSCBindings] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listSMSCBindings, searchSMSCBinding } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let smcbdg = []
        if (isEmpty(searchParams)) {
            smcbdg = await listSMSCBindings(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            smcbdg = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            smcbdg = await searchSMSCBinding(perPage, searchParams.column, searchParams.value)
        }
         
        setSMSCBindings(smcbdg)
        setColumns(["country_name", "country_code", "operator_name", "operator_code", "smsc_name", "smsc_value", "default", "created_at"])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let smcbdg = {}
        if (isEmpty(searchParams)) {
            smcbdg = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            smcbdg = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(smcbdg)) setSMSCBindings(smcbdg)
    }

    const searchEntityColumn = async (column, value) => {
        const smcbdg = await searchSMSCBinding(10, column, value)
        if (smcbdg) setSMSCBindings(smcbdg)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const smcbdg = await search("smsc_binding", criteria, 10)
        if (smcbdg) setSMSCBindings(smcbdg)
        setSearchParams({entity: encodeString("smsc_binding"), criteria: encodeString(criteria), enti: "smsc_binding", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let smcbdg = []
        if (isEmpty(searchParams)) {
            smcbdg = await listSMSCBindings(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            smcbdg = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            smcbdg = await searchSMSCBinding(1000000000000, searchParams.column, searchParams.value)
        }
        setSMSCBindings(smcbdg)
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

    const deleteSMSCBindingHandler = (smscBinding, onDelete) => {
        navigate("modal-content", "delete-smsc-binding", smscBinding, onDelete)
    }

    return (
        ! isEmpty(smscBindings) && 
        (
        <Page title="SMSC Bindings">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
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
        </Page>
        )
    )
}

export default ListSMSCBindings