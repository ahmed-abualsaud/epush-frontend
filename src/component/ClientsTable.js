import Table from "./Table"
import PageInput from "./PageInput"
import Paginator from "./Paginator"
import useAxiosApi from "../api/Api"
import Search from '../layout/Search'
import Export from '../layout/Export'
import { isEmpty } from "../utils/helper"
import useCoreApi from "../api/useCoreApi"
import PerPageDropList from "./PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "./ShowAll"


const ClientsTable = () =>
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
        "sales",
        "business_field"
    ]

    const [clients, setClients] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listClients, searchClient } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listClients(perPage)
        } else {
            clt = await searchClient(perPage, searchParams.column, searchParams.value)
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
        const clt = await searchClient(10, column, value)
        if (clt) setClients(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listClients(1000000000000)
        } else {
            clt = await searchClient(1000000000000, searchParams.column, searchParams.value)
        }
        setClients(clt)
    }

    return (
        ! isEmpty(clients) && 
        (<>
            <div className="d-flex align-items-center justify-content-between">
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns.filter(item => item !== "websites")} rows={clients.data}/>
            </div>
            <Table entity="Client" data={clients.data} total={clients.total} perPage={clients.per_page}>
                <PageInput url={clients.links[1].url.split("?")[0] + "?take=" + clients.per_page} numberOfPages={Math.ceil(parseFloat(clients.total/clients.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={clients.links} perPage={clients.per_page} total={clients.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
            </Table>
        </>)
    )
}

export default ClientsTable