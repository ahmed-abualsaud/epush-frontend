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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"
import Page from "../../page/Page"

const ListPermissions = () =>
{
    const excludedColumns = ["id", "updated_at", "deleted_at"]

    const [columns, setColumns] = useState([])
    const [permissions, setPermissions] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listPermissions } = useAuthApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let prm = []
        if (isEmpty(searchParams)) {
            prm = await listPermissions(perPage)
        } else {
            prm = await search(searchParams.enti, searchParams.crit, perPage)
        }

        setPermissions(prm)
        setColumns(prm?.data[0] ? Object.keys(prm?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }

    const handleGetPage = async (pageUrl) => {
        let prm = {}
        if (isEmpty(searchParams)) {
            prm = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            prm = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(prm)) setPermissions(prm)
    }

    const onSearch = async (criteria) => {
        const prm = await search("permission", criteria, 10)
        if (prm) setPermissions(prm)
        setSearchParams({entity: encodeString("permission"), criteria: encodeString(criteria), enti: "permission", crit: criteria})
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

    const deletePermissionHandler = (permission, onDelete) => {
        navigate("modal-content", "delete-permission", permission, onDelete)
    }

    return (
        ! isEmpty(permissions) && 
        (
            <Page title="Permissions">
                <ComplexSearch columns={columns} onSearch={onSearch}/>
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
            </Page>
        )
    )
}

export default ListPermissions