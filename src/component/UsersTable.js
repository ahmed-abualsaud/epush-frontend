import Table from "./Table"
import PageInput from "./PageInput"
import Paginator from "./Paginator"
import useAxiosApi from "../api/Api"
import useAuthApi from "../api/useAuthApi"
import PerPageDropList from "./PerPageDropList"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../utils/helper"

const UsersTable = () =>
{
    const { listUsers } = useAuthApi()
    const { sendGetRequest } = useAxiosApi()
    const [users, setUsers] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const usr = await listUsers(perPage)
        if (usr) setUsers(usr)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        const usr = await sendGetRequest(pageUrl)
        if (usr) setUsers(usr)
    }

    return (
        ! isEmpty(users) && 
        (<Table entity="User" data={users.data} total={users.total} perPage={users.per_page}>
            <PageInput url={users.links[1].url.split("?")[0] + "?take=" + users.per_page} numberOfPages={Math.ceil(parseFloat(users.total/users.per_page))} setPageHandler={handleGetPage} />
            <Paginator links={users.links} perPage={users.per_page} total={users.total} getPageHandler={ handleGetPage }/>
            <PerPageDropList perPageHandler={ setup }/>
        </Table>)
    )
}

export default UsersTable