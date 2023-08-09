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


const AdminsTable = () =>
{
    const excludedColumns = [

        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "id",
        "user_id"
    ]

    const [admins, setAdmins] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listAdmins, searchAdmin } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listAdmins(perPage)
        } else {
            clt = await searchAdmin(perPage, searchParams.column, searchParams.value)
        }
         
        setAdmins(clt)
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
        if (! isEmpty(clt)) setAdmins(clt)
    }

    const searchEntityColumn = async (column, value) => {
        const clt = await searchAdmin(10, column, value)
        if (clt) setAdmins(clt)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let clt = []
        if (isEmpty(searchParams)) {
            clt = await listAdmins(1000000000000)
        } else {
            clt = await searchAdmin(1000000000000, searchParams.column, searchParams.value)
        }
        setAdmins(clt)
    }

    return (
        ! isEmpty(admins) && 
        (<>
            <div className="d-flex align-items-center justify-content-between">
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={admins.data}/>
            </div>
            <Table entity="Admin" data={admins.data} total={admins.total} perPage={admins.per_page}>
                <PageInput url={admins.links[1].url.split("?")[0] + "?take=" + admins.per_page} numberOfPages={Math.ceil(parseFloat(admins.total/admins.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={admins.links} perPage={admins.per_page} total={admins.total} getPageHandler={handleGetPage}/>
                <PerPageDropList perPageHandler={ setup }/>
            </Table>
        </>)
    )
}

export default AdminsTable