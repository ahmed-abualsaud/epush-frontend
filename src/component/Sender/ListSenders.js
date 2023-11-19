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


const ListSenders = () =>
{
    const [senders, setSenders] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listSenders, searchSender } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let snd = []
        if (isEmpty(searchParams)) {
            snd = await listSenders(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            snd = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            snd = await searchSender(perPage, searchParams.column, searchParams.value)
        }
         
        setSenders(snd)
        setColumns(["company_name", "name", "approved", "created_at"])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let snd = {}
        if (isEmpty(searchParams)) {
            snd = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            snd = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(snd)) setSenders(snd)
    }

    const searchEntityColumn = async (column, value) => {
        const snd = await searchSender(10, column, value)
        if (snd) setSenders(snd)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        const snd = await search("sender", criteria, 10)
        if (snd) setSenders(snd)
        setSearchParams({entity: encodeString("sender"), criteria: encodeString(criteria), enti: "sender", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let snd = []
        if (isEmpty(searchParams)) {
            snd = await listSenders(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            snd = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            snd = await searchSender(1000000000000, searchParams.column, searchParams.value)
        }
        setSenders(snd)
    }

    const addSenderHandler = () => {
        navigate("content", "add-sender-and-sender-connection")
    }

    const showSenderHandler = (sender) => {
        navigate("content", "show-sender", sender)
    }

    const updateSenderHandler = (sender) => {
        navigate("content", "edit-sender", sender)
    }

    const deleteSenderHandler = (sender, onDelete) => {
        navigate("modal-content", "delete-sender", sender, onDelete)
    }

    return (
        ! isEmpty(senders) && 
        (
        <Page title="Senders">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={senders.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSenderHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={senders.data.map(sender => {
                        sender.company_name = sender.company_name ?? sender.client?.company_name ?? "NULL"
                        return sender
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSenderHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSenderHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSenderHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={senders.links[1].url.split("?")[0] + "?take=" + senders.per_page} numberOfPages={Math.ceil(parseFloat(senders.total/senders.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={senders.links} perPage={senders.per_page} total={senders.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={senders.total} perPage={senders.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListSenders