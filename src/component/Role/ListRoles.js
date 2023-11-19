import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import { isEmpty } from "../../utils/helper"
import useAuthApi from "../../api/useAuthApi"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadRow from "../../layout/Table/HeadRow"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import { navigate } from "../../setup/navigator"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"
import Page from "../../page/Page"

const ListRoles = () =>
{
    const excludedColumns = ["id", "updated_at", "deleted_at"]

    const [roles, setRoles] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listRoles } = useAuthApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let rol = []
        if (isEmpty(searchParams)) {
            rol = await listRoles(perPage)
        } else {
            rol = await search(searchParams.enti, searchParams.crit, perPage)
        }

        setRoles(rol)
        setColumns(rol?.data[0] ? Object.keys(rol?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }

    const handleGetPage = async (pageUrl) => {
        let rol = {}
        if (isEmpty(searchParams)) {
            rol = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            rol = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(rol)) setRoles(rol)
    }

    const onSearch = async (criteria) => {
        const rol = await search("role", criteria, 10)
        if (rol) setRoles(rol)
        setSearchParams({entity: encodeString("role"), criteria: encodeString(criteria), enti: "role", crit: criteria})
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const addRoleHandler = () => {
        navigate("content", "add-role")
    }

    const showRoleHandler = (role) => {
        navigate("modal-content", "show-role", role)
    }

    const updateRoleHandler = (role) => {
        navigate("content", "edit-role", role)
    }

    const deleteRoleHandler = (role, onDelete) => {
        navigate("modal-content", "delete-role", role, onDelete)
    }

    return (
        ! isEmpty(roles) && 
        (
            <Page title="Roles">
                <ComplexSearch columns={columns} onSearch={onSearch}/>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                            <AddRowCell addingFunction={addRoleHandler}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={roles.data}>
                            {withOperationCellParameters(ShowRowCell, "showFunction", showRoleHandler, {popup: true})}
                            {withOperationCellParameters(UpdateRowCell, "updateFunction", updateRoleHandler)}
                            {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteRoleHandler)}
                        </DataRows>
                    </TableBody>
                </Table>

                <PaginationContainer>
                    <PageInput url={roles.links[1].url.split("?")[0] + "?take=" + roles.per_page} numberOfPages={Math.ceil(parseFloat(roles.total/roles.per_page))} setPageHandler={handleGetPage} />
                    <Paginator links={roles.links} perPage={roles.per_page} total={roles.total} getPageHandler={ handleGetPage }/>
                    <PerPageDropList perPageHandler={ setup }/>
                    <PaginationInfo total={roles.total} perPage={roles.per_page}/>
                </PaginationContainer>
            </Page>
        )
    )
}

export default ListRoles