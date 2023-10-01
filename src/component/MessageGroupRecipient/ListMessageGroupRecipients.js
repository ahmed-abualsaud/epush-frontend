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


const ListMessageGroupRecipients = ({messageGroup}) =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar",
        "recipients",
        'message_group',
        'message_group_id',
        "email_verified_at",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [messageGroupRecipients, setMessageGroupRecipients] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listMessageGroupRecipients, searchMessageGroupRecipient } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {

        if (!isEmpty(messageGroup)) {
            messageGroup.recipients = messageGroup.recipients.map(rcp => {rcp.message_group = messageGroup; return rcp})
        }

        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = isEmpty(messageGroup) ? (await listMessageGroupRecipients(perPage)) : {data: messageGroup.recipients}
        } else {
            msgrp = await searchMessageGroupRecipient(perPage, searchParams.column, searchParams.value)
        }

        setMessageGroupRecipients(msgrp)

        setColumns(msgrp?.data[0] ? ["group_name", ...Object.keys(msgrp?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        )] : [])
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
        if (! isEmpty(msgrp)) setMessageGroupRecipients(msgrp)
    }

    const searchEntityColumn = async (column, value) => {
        const msgrp = await searchMessageGroupRecipient(10, column, value)
        if (msgrp) setMessageGroupRecipients(msgrp)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let msgrp = []
        if (isEmpty(searchParams)) {
            msgrp = await listMessageGroupRecipients(1000000000000)
        } else {
            msgrp = await searchMessageGroupRecipient(1000000000000, searchParams.column, searchParams.value)
        }
        setMessageGroupRecipients(msgrp)
    }

    const addMessageGroupRecipientHandler = () => {
        navigate("content", "add-message-group-recipient")
    }

    // const showMessageGroupRecipientHandler = (messageGroupRecipient) => {
    //     navigate("content", "show-message-group-recipient", messageGroupRecipient)
    // }

    const updateMessageGroupRecipientHandler = (messageGroupRecipient) => {
        navigate("content", "edit-message-group-recipient", messageGroupRecipient)
    }

    const deleteMessageGroupRecipientHandler = (messageGroupRecipient, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-message-group-recipient", messageGroupRecipient, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(messageGroupRecipients) && 
        (
        <div className="add-user-container">
            <h1 className="add-user-header">Message Group Recipients</h1>
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
                        {/* {withOperationCellParameters(ShowRowCell, "showFunction", showMessageGroupRecipientHandler)} */}
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
        </div>
        )
    )
}

export default ListMessageGroupRecipients