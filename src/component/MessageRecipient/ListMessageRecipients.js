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
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"


const ListMessageRecipients = () =>
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
    const [messageRecipients, setMessageRecipients] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessageRecipients, searchMessageRecipient } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listMessageRecipients(perPage)
        } else {
            clt = await searchMessageRecipient(perPage, searchParams.column, searchParams.value)
        }
         
        setMessageRecipients(clt)
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
        if (! isEmpty(clt)) setMessageRecipients(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchMessageRecipient(10, column, value)
        if (clt) setMessageRecipients(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listMessageRecipients(1000000000000)
        } else {
            clt = await searchMessageRecipient(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageRecipients(clt)
    }

    return (
        ! isEmpty(messageRecipients) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All MessageRecipients</h1>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageRecipients.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageRecipients.data}/>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageRecipients.links[1].url.split("?")[0] + "?take=" + messageRecipients.per_page} numberOfPages={Math.ceil(parseFloat(messageRecipients.total/messageRecipients.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageRecipients.links} perPage={messageRecipients.per_page} total={messageRecipients.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageRecipients.total} perPage={messageRecipients.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListMessageRecipients