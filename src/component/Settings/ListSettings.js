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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"
import Page from "../../page/Page"


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

    const { search } = useSearchApi()
    const { listSettings, searchSettings } = useSettingsApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let stn = []
        if (isEmpty(searchParams)) {
            stn = await listSettings(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            stn = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            stn = await searchSettings(perPage, searchParams.column, searchParams.value)
        }
         
        setSettings(stn)
        setColumns(stn?.data[0] ? Object.keys(stn?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let stn = {}
        if (isEmpty(searchParams)) {
            stn = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            stn = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(stn)) setSettings(stn)
    }

    const searchEntityColumn = async (column, value) => {
        const stn = await searchSettings(10, column, value)
        if (stn) setSettings(stn)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const opr = await search("setting", criteria, 10)
        if (opr) setSettings(opr)
        setSearchParams({entity: encodeString("setting"), criteria: encodeString(criteria), enti: "setting", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await listSettings(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            opr = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            opr = await searchSettings(1000000000000, searchParams.column, searchParams.value)
        }
        setSettings(opr)
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

    const deleteSettingsHandler = (settings, onDelete) => {
        navigate("modal-content", "delete-settings", settings, onDelete)
    }

    return (
        ! isEmpty(settings) && 
        (
        <Page title="Settings">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
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
        </Page>
        )
    )
}

export default ListSettings