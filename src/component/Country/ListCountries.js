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
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import Page from "../../page/Page"


const ListCountries = () =>
{
    const excludedColumns = [

        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "id",
        "user_id"
    ]

    const [countries, setCountries] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listCountries, searchCountry } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let ctry = []
        if (isEmpty(searchParams)) {
            ctry = await listCountries(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            ctry = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            ctry = await searchCountry(perPage, searchParams.column, searchParams.value)
        }
         
        setCountries(ctry)
        setColumns(ctry?.data[0] ? Object.keys(ctry?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let ctry = {}
        if (isEmpty(searchParams)) {
            ctry = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            ctry = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(ctry)) setCountries(ctry)
    }

    const searchEntityColumn = async (column, value) => {
        const ctry = await searchCountry(10, column, value)
        if (ctry) setCountries(ctry)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const ctry = await search("country", criteria, 10)
        if (ctry) setCountries(ctry)
        setSearchParams({entity: encodeString("country"), criteria: encodeString(criteria), enti: "country", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let ctry = []
        if (isEmpty(searchParams)) {
            ctry = await listCountries(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            ctry = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            ctry = await searchCountry(1000000000000, searchParams.column, searchParams.value)
        }
        setCountries(ctry)
    }

    const addCountryHandler = () => {
        navigate("content", "add-country")
    }

    const showCountryHandler = (country) => {
        navigate("content", "show-country", country)
    }

    const updateCountryHandler = (country) => {
        navigate("content", "edit-country", country)
    }

    const deleteCountryHandler = (country, onDelete) => {
        navigate("modal-content", "delete-country", country, onDelete)
    }

    return (
        ! isEmpty(countries) && 
        (
        <Page title="Countries">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={countries.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addCountryHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={countries.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showCountryHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateCountryHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteCountryHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={countries.links[1].url.split("?")[0] + "?take=" + countries.per_page} numberOfPages={Math.ceil(parseFloat(countries.total/countries.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={countries.links} perPage={countries.per_page} total={countries.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={countries.total} perPage={countries.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListCountries