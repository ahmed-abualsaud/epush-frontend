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
import useSettingsApi from "../../api/useSettingsApi"


const ListSettings = () =>
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
    const [settings, setSettings] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listSettings, searchSettings } = useSettingsApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSettings(perPage)
        } else {
            clt = await searchSettings(perPage, searchParams.column, searchParams.value)
        }
         
        setSettings(clt)
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
        if (! isEmpty(clt)) setSettings(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchSettings(10, column, value)
        if (clt) setSettings(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listSettings(1000000000000)
        } else {
            clt = await searchSettings(1000000000000, searchParams.column, searchParams.value)
        }
        setSettings(clt)
    }

    const addSettingsHandler = () => {
        navigate("content", "add-settings")
    }

    const showSettingsHandler = (settings) => {
        navigate("content", "show-settings", settings)
    }

    const updateSettingsHandler = (settings) => {
        navigate("content", "edit-settings", settings)
    }

    const deleteSettingsHandler = (settings, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-settings", settings, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(settings) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All Settings</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={settings.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSettingsHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={settings.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSettingsHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSettingsHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSettingsHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={settings.links[1].url.split("?")[0] + "?take=" + settings.per_page} numberOfPages={Math.ceil(parseFloat(settings.total/settings.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={settings.links} perPage={settings.per_page} total={settings.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={settings.total} perPage={settings.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListSettings