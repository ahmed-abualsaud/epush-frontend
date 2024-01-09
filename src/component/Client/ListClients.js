// import Table from "./Table"
import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty, normalizeUsers } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../layout/TableOperation/ShowAll"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import { navigate } from "../../setup/navigator"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import HeadRow from "../../layout/Table/HeadRow"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"


const ListClients = () =>
{
    const excludedColumns = [
        "clientId", 
        "isNotify", 
        "ip_required", 
        "ip", 
        "deleteDate", 
        "updateDate", 
        "saveDate", 
        "reg_date", 
        "areaId",
        "agree", 
        "active", 
        "userId", 
        "adminId", 
        "pricelist_Id", 
        "pricelist_id", 
        "show_msg_details", 
        "birthDate", 
        "FDelete", 
        "access", 
        "IsTestAccount", 
        "governmentId", 
        "first_name", 
        "last_name", 
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "fullName",
        "mobile",
        "use_api",
        "api_token",
        "pricelistId",
        "id",
        "religion",
        "user_id",
        "sales_id",
        "business_field_id",
        "websites",
    ]

    const [clients, setClients] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listClients } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listClients(perPage)
        } else {
            clt = await search(searchParams.enti, searchParams.crit, perPage)
        }
        setClients(clt)
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
            clt.data = normalizeUsers(clt.data)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            clt = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(clt)) setClients(clt)
    }

    const searchEntityColumn = async (column, value) => {
        let criteria = column + " LIKE '%" + value + "%'"
        const clt = await search("client", criteria, 10)
        if (clt) setClients(clt)
        setSearchParams({entity: encodeString("client"), criteria: encodeString(criteria), enti: "client", crit: criteria})
    }

    const onSearch = async (criteria) => {
        const clt = await search("client", criteria, 10)
        if (clt) setClients(clt)
        setSearchParams({entity: encodeString("client"), criteria: encodeString(criteria), enti: "client", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listClients(1000000000000)
        } else {
            clt = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setClients(clt)
    }

    const addClientHandler = () => {
        navigate("content", "add-client")
    }

    const showClientHandler = (client) => {
        navigate("content", "show-client", client)
    }

    const updateClientHandler = (client) => {
        navigate("content", "edit-client", client)
    }

    const deleteClientHandler = (client, onDelete) => {
        navigate("modal-content", "delete-client", client, onDelete)
    }

    return (
        ! isEmpty(clients) && 
        (
        <>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns.filter(item => item !== "websites")} rows={clients.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addClientHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={clients.data.map(client => {
                        client.sales = client.sales?.name ?? "NULL"
                        client.business_field = client.business_field?.name ?? "NULL"
                        client.full_name = client.full_name ?? client.first_name + " " + client.last_name
                        return client
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showClientHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateClientHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteClientHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={clients.links[1].url.split("?")[0] + "?take=" + clients.per_page} numberOfPages={Math.ceil(parseFloat(clients.total/clients.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={clients.links} perPage={clients.per_page} total={clients.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={clients.total} perPage={clients.per_page}/>
            </PaginationContainer>
        </>
        )
    )
}

export default ListClients