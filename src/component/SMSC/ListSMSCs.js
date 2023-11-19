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

    const { search } = useSearchApi()
    const { listSMSCs, searchSMSC } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let smsc = []
        if (isEmpty(searchParams)) {
            smsc = await listSMSCs(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            smsc = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            smsc = await searchSMSC(perPage, searchParams.column, searchParams.value)
        }
         
        setSMSCs(smsc)
        setColumns(smsc?.data[0] ? Object.keys(smsc?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let smsc = {}
        if (isEmpty(searchParams)) {
            smsc = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            smsc = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(smsc)) setSMSCs(smsc)
    }

    const searchEntityColumn = async (column, value) => {
        const smsc = await searchSMSC(10, column, value)
        if (smsc) setSMSCs(smsc)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const smsc = await search("smsc", criteria, 10)
        if (smsc) setSMSCs(smsc)
        setSearchParams({entity: encodeString("smsc"), criteria: encodeString(criteria), enti: "smsc", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let smsc = []
        if (isEmpty(searchParams)) {
            smsc = await listSMSCs(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            smsc = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            smsc = await searchSMSC(1000000000000, searchParams.column, searchParams.value)
        }
        setSMSCs(smsc)
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

    const deleteSMSCHandler = (smsc, onDelete) => {
        navigate("modal-content", "delete-smsc", smsc, onDelete)
    }

    return (
        ! isEmpty(smscs) && 
        (
        <Page title="SMSCs">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
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
        </Page>
        )
    )
}

export default ListSMSCs