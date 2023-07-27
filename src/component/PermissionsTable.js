import Table from "./Table"
import PageInput from "./PageInput"
import Paginator from "./Paginator"
import useAxiosApi from "../api/Api"
import { isEmpty } from "../utils/helper"
import useAuthApi from "../api/useAuthApi"
import PerPageDropList from "./PerPageDropList"
import { useEffect, useRef, useState } from "react"

const PermissionsTable = () =>
{
    const { listPermissions } = useAuthApi()
    const { sendGetRequest } = useAxiosApi()
    const [permissions, setPermissions] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const prm = await listPermissions(perPage)
        if (prm) setPermissions(prm)
    }

    const handleGetPage = async (pageUrl) => {
        const prm = await sendGetRequest(pageUrl)
        if (prm) setPermissions(prm)
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    return (
        ! isEmpty(permissions) && 
        (<Table entity="Permission" data={permissions.data} total={permissions.total} perPage={permissions.per_page}>
            <PageInput url={permissions.links[1].url.split("?")[0] + "?take=" + permissions.per_page} numberOfPages={Math.ceil(parseFloat(permissions.total/permissions.per_page))} setPageHandler={handleGetPage} />
            <Paginator links={permissions.links} perPage={permissions.per_page} getPageHandler={ handleGetPage }/>
            <PerPageDropList perPageHandler={ setup }/>
        </Table>)
    )
}

export default PermissionsTable