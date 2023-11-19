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
import { useSelector } from "react-redux"
import Page from "../../page/Page"


const ListClientMessageGroups = () =>
{
    const [columns, setColumns] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            let criteria = "user_id = " + user?.user?.id
            setSearchParams({entity: encodeString("message_group"), criteria: encodeString(criteria), enti: "message_group", crit: criteria})
            msgrp = await search("message_group", criteria, perPage)
        } else {
            msgrp = await search(searchParams.enti, searchParams.crit, perPage)
        }

        setMessageGroups(msgrp)
        setColumns(["group_name", "number_of_recipients", "updated_at", "created_at"])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msgrp = {}
        if (isEmpty(searchParams)) {
            msgrp = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            msgrp = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(msgrp)) setMessageGroups(msgrp)
    }

    const searchEntityColumn = async (column, value) => {
        let criteria = "user_id = " + user?.user?.id + " And " + column + " LIKE '%" + value + "%'"
        const msgrp = await search("message_group", criteria, 10)
        if (msgrp) setMessageGroups(msgrp)
        setSearchParams({entity: encodeString("message"), criteria: encodeString(criteria), enti: "message", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "user_id = " + user?.user?.id + " And " + criteria
        const msg = await search("message_group", criteria, 10)
        if (msg) setMessageGroups(msg)
        setSearchParams({entity: encodeString("message_group"), criteria: encodeString(criteria), enti: "message_group", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await search("message_group", "user_id = " + user?.user?.id, 1000000000000)
        } else {
            msgrp = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setMessageGroups(msgrp)
    }

    const addMessageGroupHandler = () => {
        navigate("content", "add-client-message-group")
    }

    const showMessageGroupHandler = (messageGroup) => {
        navigate("content", "show-message-group", messageGroup)
    }

    const updateMessageGroupHandler = (messageGroup) => {
        navigate("content", "edit-message-group", messageGroup)
    }

    const deleteMessageGroupHandler = (messageGroup, onDelete) => {
        navigate("modal-content", "delete-message-group", messageGroup, onDelete)
    }

    return (
        ! isEmpty(messageGroups) && 
        (
        <Page title="Message Groups">
            <ComplexSearch columns={columns.filter(column => column !== "number_of_recipients")} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns.filter(column => column !== "number_of_recipients")} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={messageGroups.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addMessageGroupHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageGroups.data.map(group => {group.number_of_recipients = group?.recipients?.length ?? "NULL"; return group})}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showMessageGroupHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateMessageGroupHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMessageGroupHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={messageGroups.links[1].url.split("?")[0] + "?take=" + messageGroups.per_page} numberOfPages={Math.ceil(parseFloat(messageGroups.total/messageGroups.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={messageGroups.links} perPage={messageGroups.per_page} total={messageGroups.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={messageGroups.total} perPage={messageGroups.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListClientMessageGroups