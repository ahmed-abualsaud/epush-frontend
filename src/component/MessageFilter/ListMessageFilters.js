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
import Slider from "../../layout/Shared/Slider"
import useSettingsApi from "../../api/useSettingsApi"
import { Settings } from "../../utils/settings"
import { showAlert } from "../../utils/validator"


const ListMessageFilters = () =>
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
    const [searchParams, setSearchParams] = useState({})
    const [messageFilters, setMessageFilters] = useState([])
    const [wordFilterThreshold, setWordFilterThreshold] = useState(null)

    const { getSettingsByName, updateSettings } = useSettingsApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()
    const { listMessageFilters, searchMessageFilter } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        setWordFilterThreshold(await getSettingsByName(Settings.WORD_FILTER_THRESHOLD))

        let msgfltr = []
        if (isEmpty(searchParams)) {
            msgfltr = await listMessageFilters(perPage)
        } else {
            msgfltr = await searchMessageFilter(perPage, searchParams.column, searchParams.value)
        }
         
        setMessageFilters(msgfltr)
        setColumns(msgfltr?.data[0] ? Object.keys(msgfltr?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msgfltr = {}
        if (isEmpty(searchParams)) {
            msgfltr = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            msgfltr = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(msgfltr)) setMessageFilters(msgfltr)
    }

    const searchEntityColumn = async (column, value) => {
        const msgfltr = await searchMessageFilter(10, column, value)
        if (msgfltr) setMessageFilters(msgfltr)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let msgfltr = []
        if (isEmpty(searchParams)) {
            msgfltr = await listMessageFilters(1000000000000)
        } else {
            msgfltr = await searchMessageFilter(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageFilters(msgfltr)
    }

    const addMessageFilterHandler = () => {
        navigate("content", "add-message-filter")
    }

    const showMessageFilterHandler = (messageFilter) => {
        navigate("content", "show-message-filter", messageFilter)
    }

    const updateMessageFilterHandler = (messageFilter) => {
        navigate("content", "edit-message-filter", messageFilter)
    }

    const deleteMessageFilterHandler = (messageFilter, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-message-filter", messageFilter, deletedRows, setDeletedRows)
    }

    const onSelectSliderValue = async (value) => {

        const updatedSettings = await updateSettings(wordFilterThreshold.id, {value: value})
        if (! isEmpty(updatedSettings)) {
            setWordFilterThreshold(updatedSettings)
            showAlert("Word Filter Threshold Updated Successfully");
        }
    }

    return (
        ! isEmpty(messageFilters) && 
        (
        <div className="add-user-container">           

            <div className="m-5">
                <div style={{display: "inline-flex", alignContent: "center", width: "25%", fontSize: "25px"}}>Word Filter Threshold</div>
                <div style={{display: "inline-flex", alignContent: "center", width: "50%"}}>
                    <Slider defaultValue={wordFilterThreshold.value} onValueChange={onSelectSliderValue}/>
                </div>
                <div style={{display: "inline-flex", alignContent: "center", width: "25%", fontSize: "25px"}}>Current Value = {wordFilterThreshold.value}</div>
            </div>

            <div style={{ margin: "50px 0", border: "none", borderTop: "3px solid black" }} />

            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageFilters.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addMessageFilterHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageFilters.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageFilterHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateMessageFilterHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMessageFilterHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageFilters.links[1].url.split("?")[0] + "?take=" + messageFilters.per_page} numberOfPages={Math.ceil(parseFloat(messageFilters.total/messageFilters.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageFilters.links} perPage={messageFilters.per_page} total={messageFilters.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageFilters.total} perPage={messageFilters.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMessageFilters