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


const ListMessageGroups = () =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar",
        "recipients",
        "client",
        "email_verified_at",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessageGroups, searchMessageGroup } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroups(perPage)
        } else {
            msgrp = await searchMessageGroup(perPage, searchParams.column, searchParams.value)
        }

        setMessageGroups(msgrp)
        setColumns(["company_name", ...msgrp?.data[0] ? Object.keys(msgrp?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : []])
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

    const onCheckShowAll = async () => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroups(1000000000000)
        } else {
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

    const deleteMessageGroupHandler = (messageGroup, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-message-group", messageGroup, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(messageGroups) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">All Message Groups</h1>
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
                    <DataRows columns={columns} rows={messageGroups.data.map(group => {group.company_name = group?.client?.company_name; return group})}>
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
        </div>
        )
    )
}

export default ListMessageGroups