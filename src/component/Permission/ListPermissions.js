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
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import { navigate } from "../../setup/navigator"

const ListPermissions = () =>
{
    const excludedColumns = ["updated_at", "deleted_at"]

    const { listPermissions } = useAuthApi()
    const { sendGetRequest } = useAxiosApi()
    const [columns, setColumns] = useState([])
    const [permissions, setPermissions] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const prm = await listPermissions(perPage)
        if (prm) setPermissions(prm)
        setColumns(prm?.data[0] ? Object.keys(prm?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }

    const handleGetPage = async (pageUrl) => {
        const prm = await sendGetRequest(pageUrl)
        if (prm) setPermissions(prm)
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])


    const showPermissionHandler = (permission) => {
        navigate("modal-content", "show-permission", permission)
    }

    const updatePermissionHandler = (permission) => {
        navigate("content", "edit-permission", permission)
    }

    const deletePermissionHandler = (permission, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-permission", permission, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(permissions) && 
        (
            <div className="add-user-container">
                <h1 className="add-user-header">All Permissions</h1>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={permissions.data}>
                            {withOperationCellParameters(ShowRowCell, "showFunction", showPermissionHandler, {popup: true})}
                            {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePermissionHandler)}
                            {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePermissionHandler)}
                        </DataRows>
                    </TableBody>
                </Table>

                <PaginationContainer>
                    <PageInput url={permissions.links[1].url.split("?")[0] + "?take=" + permissions.per_page} numberOfPages={Math.ceil(parseFloat(permissions.total/permissions.per_page))} setPageHandler={handleGetPage} />
                    <Paginator links={permissions.links} perPage={permissions.per_page} total={permissions.total} getPageHandler={ handleGetPage }/>
                    <PerPageDropList perPageHandler={ setup }/>
                    <PaginationInfo total={permissions.total} perPage={permissions.per_page}/>
                </PaginationContainer>
            </div>
        )
    )
}

export default ListPermissions