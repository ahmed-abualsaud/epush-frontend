import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
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
import useFileApi from "../../api/useFileApi"


const ListFolders = () =>
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
    const [folders, setFolders] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listFolders, searchFolder } = useFileApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listFolders(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            opr = await searchFolder(perPage, searchParams.column, searchParams.value)
        }
         
        setFolders(opr)
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
        if (! isEmpty(opr)) setFolders(opr)
    }

    const searchEntityColumn = async (column, value) => {
        const opr = await searchFolder(10, column, value)
        if (opr) setFolders(opr)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const opr = await search("folder", criteria, 10)
        if (opr) setFolders(opr)
        setSearchParams({entity: encodeString("folder"), criteria: encodeString(criteria), enti: "folder", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listFolders(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            opr = await searchFolder(1000000000000, searchParams.column, searchParams.value)
        }
        setFolders(opr)
    }

    const addFolderHandler = () => {
        navigate("content", "add-folder")
    }

    const showFolderHandler = (folder) => {
        navigate("content", "get-folder-files", folder)
    }

    const updateFolderHandler = (folder) => {
        navigate("content", "edit-folder", folder)
    }

    const deleteFolderHandler = (folder, onDelete) => {
        navigate("modal-content", "delete-folder", folder, onDelete)
    }

    return (
        ! isEmpty(folders) && 
        (
        <Page title="Folders">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={folders.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addFolderHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={folders.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showFolderHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateFolderHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteFolderHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={folders.links[1].url.split("?")[0] + "?take=" + folders.per_page} numberOfPages={Math.ceil(parseFloat(folders.total/folders.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={folders.links} perPage={folders.per_page} total={folders.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={folders.total} perPage={folders.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListFolders