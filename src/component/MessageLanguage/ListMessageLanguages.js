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


const ListMessageLanguages = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "user_id"

    ]

    const [columns, setColumns] = useState([])
    const [messageLanguages, setMessageLanguages] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessageLanguages, searchMessageLanguage } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listMessageLanguages(perPage)
        } else {
            clt = await searchMessageLanguage(perPage, searchParams.column, searchParams.value)
        }
         
        setMessageLanguages(clt)
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
        if (! isEmpty(clt)) setMessageLanguages(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchMessageLanguage(10, column, value)
        if (clt) setMessageLanguages(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listMessageLanguages(1000000000000)
        } else {
            clt = await searchMessageLanguage(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageLanguages(clt)
    }

    const addMessageLanguageHandler = () => {
        navigate("content", "add-message-language")
    }

    const showMessageLanguageHandler = (messageLanguage) => {
        navigate("content", "show-message-language", messageLanguage)
    }

    const updateMessageLanguageHandler = (messageLanguage) => {
        navigate("content", "edit-message-language", messageLanguage)
    }

    const deleteMessageLanguageHandler = (messageLanguage, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-message-language", messageLanguage, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(messageLanguages) && 
        (
        <div className="component-container">
            <h1 className="content-header">All MessageLanguages</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageLanguages.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addMessageLanguageHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageLanguages.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageLanguageHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateMessageLanguageHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMessageLanguageHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageLanguages.links[1].url.split("?")[0] + "?take=" + messageLanguages.per_page} numberOfPages={Math.ceil(parseFloat(messageLanguages.total/messageLanguages.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageLanguages.links} perPage={messageLanguages.per_page} total={messageLanguages.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageLanguages.total} perPage={messageLanguages.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMessageLanguages