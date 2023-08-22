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

    const { listCountries, searchCountry } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listCountries(perPage)
        } else {
            clt = await searchCountry(perPage, searchParams.column, searchParams.value)
        }
         
        setCountries(clt)
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
        if (! isEmpty(clt)) setCountries(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchCountry(10, column, value)
        if (clt) setCountries(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listCountries(1000000000000)
        } else {
            clt = await searchCountry(1000000000000, searchParams.column, searchParams.value)
        }
        setCountries(clt)
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

    const deleteCountryHandler = (country, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-country", country, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(countries) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All Countries</h1>
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
        </div>
        )
    )
}

export default ListCountries