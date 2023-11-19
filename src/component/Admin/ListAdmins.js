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
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"
import Page from "../../page/Page"


const ListAdmins = () =>
{
    const excludedColumns = [

        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "id",
        "user_id"
    ]

    const [admins, setAdmins] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listAdmins, searchAdmin } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let adm = []
        if (isEmpty(searchParams)) {
            adm = await listAdmins(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            adm = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            adm = await searchAdmin(perPage, searchParams.column, searchParams.value)
        }
         
        setAdmins(adm)
        setColumns(adm?.data[0] ? Object.keys(adm?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let adm = {}
        if (isEmpty(searchParams)) {
            adm = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            adm = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(adm)) setAdmins(adm)
    }

    const searchEntityColumn = async (column, value) => {
        const adm = await searchAdmin(10, column, value)
        if (adm) setAdmins(adm)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const adm = await search("admin", criteria, 10)
        if (adm) setAdmins(adm)
        setSearchParams({entity: encodeString("admin"), criteria: encodeString(criteria), enti: "admin", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let adm = []
        if (isEmpty(searchParams)) {
            adm = await listAdmins(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            adm = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            adm = await searchAdmin(1000000000000, searchParams.column, searchParams.value)
        }
        setAdmins(adm)
    }

    const addAdminHandler = () => {
        navigate("content", "add-admin")
    }

    const showAdminHandler = (admin) => {
        navigate("content", "show-admin", admin)
    }

    const updateAdminHandler = (admin) => {
        navigate("content", "edit-admin", admin)
    }

    const deleteAdminHandler = (admin, onDelete) => {
        navigate("modal-content", "delete-admin", admin, onDelete)
    }

    return (
        ! isEmpty(admins) && 
        (
        <div>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={admins.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addAdminHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={admins.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showAdminHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateAdminHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteAdminHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={admins.links[1].url.split("?")[0] + "?take=" + admins.per_page} numberOfPages={Math.ceil(parseFloat(admins.total/admins.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={admins.links} perPage={admins.per_page} total={admins.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={admins.total} perPage={admins.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListAdmins