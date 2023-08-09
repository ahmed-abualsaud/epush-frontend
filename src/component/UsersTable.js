import Table from "./Table"
import PageInput from "./PageInput"
import Paginator from "./Paginator"
import useAxiosApi from "../api/Api"
import Search from '../layout/Search'
import Export from '../layout/Export'
import useAuthApi from "../api/useAuthApi"
import PerPageDropList from "./PerPageDropList"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../utils/helper"
import ShowAll from "./ShowAll"

const UsersTable = () =>
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
        "business_field_id" , 
        "sales_id", 
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
        "user_id"
    ]

    const [users, setUsers] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listUsers, searchUser } = useAuthApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let usr= []
        if (isEmpty(searchParams)) {
            usr = await listUsers(perPage)
        } else {
            usr = await searchUser(perPage, searchParams.column, searchParams.value)
        }

        setUsers(usr)
        setColumns(usr?.data[0] ? Object.keys(usr?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let usr = {}
        if (isEmpty(searchParams)) {
            usr = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            usr = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(usr)) setUsers(usr)
    }

    const searchEntityColumn = async (column, value) => {
        const usr = await searchUser(10, column, value)
        if (usr) setUsers(usr)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let usr = []
        if (isEmpty(searchParams)) {
            usr = await listUsers(1000000000000)
        } else {
            usr = await searchUser(1000000000000, searchParams.column, searchParams.value)
        }
        setUsers(usr)
    }



    return (
        ! isEmpty(users) && 
        (<>
            <div className="d-flex align-items-center justify-content-between">
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={users.data}/>
            </div>
            <Table entity="User" data={users.data} total={users.total} perPage={users.per_page}>
                <PageInput url={users.links[1].url.split("?")[0] + "?take=" + users.per_page} numberOfPages={Math.ceil(parseFloat(users.total/users.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={users.links} perPage={users.per_page} total={users.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
            </Table>
        </>)
    )
}

export default UsersTable