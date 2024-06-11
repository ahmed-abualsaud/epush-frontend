import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty, roleExists } from "../../utils/helper"
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
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"


const ListMessageGroups = () =>
{
    const [columns, setColumns] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [authUser, setAuthUser] = useState({})
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listMessageGroups, searchMessageGroup } = useCoreApi()
    const { sendGetRequest, sendPostRequest, getAuthenticatedUser } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        setAuthUser(getAuthenticatedUser())

        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroups(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgrp = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            msgrp = await searchMessageGroup(perPage, searchParams.column, searchParams.value)
        }

        setMessageGroups(msgrp)
        setColumns(["company_name", "name", "created_at"])
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
        const msgrp = await searchMessageGroup(10, column, value)
        if (msgrp) setMessageGroups(msgrp)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const msg = await search("message_group", criteria, 10)
        if (msg) setMessageGroups(msg)
        setSearchParams({entity: encodeString("message_group"), criteria: encodeString(criteria), enti: "message_group", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroups(1000000000000)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgrp = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        else {
            msgrp = await searchMessageGroup(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageGroups(msgrp)
    }

    const addMessageGroupHandler = () => {
        navigate("content", "add-message-group")
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
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
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
                    <DataRows columns={columns} rows={messageGroups.data.map(group => {group.company_name = group?.client?.company_name ?? group?.company_name; return group})}>
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

export default ListMessageGroups