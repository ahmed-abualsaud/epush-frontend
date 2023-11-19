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


const ListOperators = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [operators, setOperators] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listOperators, searchOperator } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listOperators(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            opr = await searchOperator(perPage, searchParams.column, searchParams.value)
        }
         
        setOperators(opr)
        setColumns(opr?.data[0] ? Object.keys(opr?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let opr = {}
        if (isEmpty(searchParams)) {
            opr = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            opr = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(opr)) setOperators(opr)
    }

    const searchEntityColumn = async (column, value) => {
        const opr = await searchOperator(10, column, value)
        if (opr) setOperators(opr)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const opr = await search("operator", criteria, 10)
        if (opr) setOperators(opr)
        setSearchParams({entity: encodeString("operator"), criteria: encodeString(criteria), enti: "operator", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listOperators(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            opr = await searchOperator(1000000000000, searchParams.column, searchParams.value)
        }
        setOperators(opr)
    }

    const addOperatorHandler = () => {
        navigate("content", "add-operator")
    }

    const showOperatorHandler = (operator) => {
        navigate("content", "show-operator", operator)
    }

    const updateOperatorHandler = (operator) => {
        navigate("content", "edit-operator", operator)
    }

    const deleteOperatorHandler = (operator, onDelete) => {
        navigate("modal-content", "delete-operator", operator, onDelete)
    }

    return (
        ! isEmpty(operators) && 
        (
        <Page title="Operators">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={operators.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addOperatorHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={operators.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showOperatorHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateOperatorHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteOperatorHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={operators.links[1].url.split("?")[0] + "?take=" + operators.per_page} numberOfPages={Math.ceil(parseFloat(operators.total/operators.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={operators.links} perPage={operators.per_page} total={operators.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={operators.total} perPage={operators.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListOperators