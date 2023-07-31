import Table from "./Table"
import PageInput from "./PageInput"
import Paginator from "./Paginator"
import useAxiosApi from "../api/Api"
import { isEmpty } from "../utils/helper"
import useAuthApi from "../api/useAuthApi"
import PerPageDropList from "./PerPageDropList"
import { useEffect, useRef, useState } from "react"

const RolesTable = () =>
{
    const { listRoles } = useAuthApi()
    const { sendGetRequest } = useAxiosApi()
    const [roles, setRoles] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const rol = await listRoles(perPage)
        if (rol) setRoles(rol)
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        const rol = await sendGetRequest(pageUrl)
        if (rol) setRoles(rol)
    }

    return (
        ! isEmpty(roles) && 
        (<Table entity="Role" data={roles.data} total={roles.total} perPage={roles.per_page}>
            <PageInput url={roles.links[1].url.split("?")[0] + "?take=" + roles.per_page} numberOfPages={Math.ceil(parseFloat(roles.total/roles.per_page))} setPageHandler={handleGetPage} />
            <Paginator links={roles.links} perPage={roles.per_page} total={roles.total} getPageHandler={ handleGetPage }/>
            <PerPageDropList perPageHandler={ setup }/>
        </Table>)
    )
}

export default RolesTable