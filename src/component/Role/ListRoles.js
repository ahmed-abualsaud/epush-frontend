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

const ListRoles = () =>
{
    const excludedColumns = ["updated_at", "deleted_at"]

    const { listRoles } = useAuthApi()
    const { sendGetRequest } = useAxiosApi()

    const [roles, setRoles] = useState([])
    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const rol = await listRoles(perPage)
        if (rol) setRoles(rol)

        setColumns(rol?.data[0] ? Object.keys(rol?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        const rol = await sendGetRequest(pageUrl)
        if (rol) setRoles(rol)
    }

    const addRoleHandler = () => {
        navigate("content", "add-role")
    }

    const showRoleHandler = (role) => {
        navigate("modal-content", "show-role", role)
    }

    const updateRoleHandler = (role) => {
        navigate("content", "edit-role", role)
    }

    const deleteRoleHandler = (role, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-role", role, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(roles) && 
        (
            <div className="component-container">
                <h1 className="content-header">All Roles</h1>
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
            </div>
        )
    )
}

export default ListRoles