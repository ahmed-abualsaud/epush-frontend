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


const ListMessageGroupRecipients = ({messageGroup}) =>
{
    const [columns, setColumns] = useState([])
    const [authUser, setAuthUser] = useState({})
    const [messageGroupRecipients, setMessageGroupRecipients] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listMessageGroupRecipients, searchMessageGroupRecipient } = useCoreApi()
    const { sendGetRequest, sendPostRequest, getAuthenticatedUser } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        setAuthUser(getAuthenticatedUser())

        if (!isEmpty(messageGroup)) {
            messageGroup.recipients = messageGroup?.recipients?.map(rcp => {rcp.message_group = messageGroup; return rcp})
        }

        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = isEmpty(messageGroup) ? (await listMessageGroupRecipients(perPage)) : {data: messageGroup.recipients}
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgrp = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            msgrp = await searchMessageGroupRecipient(perPage, searchParams.column, searchParams.value)
        }

        setMessageGroupRecipients(msgrp)
        setColumns(["group_name", "number", "attributes", "created_at"])
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
            let params = {...searchParams}
            if (roleExists(authUser.roles, "partner")) {
                params.partner_id = authUser.user.id
            }
            msgrp = await sendPostRequest(pageUrl, params)
        }

        if (! isEmpty(msgrp)) setMessageGroupRecipients(msgrp)
    }

    const searchEntityColumn = async (column, value) => {
        const msgrp = await searchMessageGroupRecipient(10, column, value)
        if (msgrp) setMessageGroupRecipients(msgrp)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const msgrp = await search("message_group_recipient", criteria, 10)
        if (msgrp) setMessageGroupRecipients(msgrp)
        setSearchParams({entity: encodeString("message_group_recipient"), criteria: encodeString(criteria), enti: "message_group_recipient", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroupRecipients(1000000000000)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            msgrp = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        else {
            msgrp = await searchMessageGroupRecipient(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageGroupRecipients(msgrp)
    }

    const addMessageGroupRecipientHandler = () => {
        navigate("content", "add-message-group-recipient")
    }

    const updateMessageGroupRecipientHandler = (messageGroupRecipient) => {
        navigate("content", "edit-message-group-recipient", messageGroupRecipient)
    }

    const deleteMessageGroupRecipientHandler = (messageGroupRecipient, onDelete) => {
        navigate("modal-content", "delete-message-group-recipient", messageGroupRecipient, onDelete)
    }

    return (
        ! isEmpty(messageGroupRecipients) && 
        (
        <Page title="Message Group Recipients">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
            {! isEmpty(messageGroup) ? 
                <div className="mt-3 w-100 d-flex justify-content-center">
                    <Export columns={columns} rows={messageGroupRecipients.data}/>
                </div>:
                <>
                    <ShowAll onCheck={onCheckShowAll}/>
                    <Search columns={columns} searchColumn={searchEntityColumn}/>
                    <Export columns={columns} rows={messageGroupRecipients.data}/>
                </>
            }
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addMessageGroupRecipientHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={messageGroupRecipients.data.map(mgr => {
                        mgr.group_name = mgr.message_group?.name
                        return mgr
                    })}>
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateMessageGroupRecipientHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteMessageGroupRecipientHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            {! isEmpty(messageGroup) ? <></>:
                <PaginationContainer>
                    <PageInput url={messageGroupRecipients.links[1].url.split("?")[0] + "?take=" + messageGroupRecipients.per_page} numberOfPages={Math.ceil(parseFloat(messageGroupRecipients.total/messageGroupRecipients.per_page))} setPageHandler={handleGetPage} />
                    <Paginator links={messageGroupRecipients.links} perPage={messageGroupRecipients.per_page} total={messageGroupRecipients.total} getPageHandler={ handleGetPage }/>
                    <PerPageDropList perPageHandler={ setup }/>
                    <PaginationInfo total={messageGroupRecipients.total} perPage={messageGroupRecipients.per_page}/>
                </PaginationContainer>
            }
        </Page>
        )
    )
}

export default ListMessageGroupRecipients