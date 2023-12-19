import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../layout/TableOperation/ShowAll"
import { navigate } from "../../setup/navigator"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"
import useQueueApi from "../../api/useQueueApi"


const ListJobs = ({ queue }) =>
{
    const excludedColumns = [

        "id",
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "user_id"
    ]

    const [columns, setColumns] = useState([])
    const [jobs, setJobs] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { getQueueJobs, searchQueueJob } = useQueueApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await getQueueJobs(queue, perPage)
        }
        else {
            opr = await searchQueueJob(queue, perPage, searchParams.column, searchParams.value)
        }

        setJobs(opr)
        setColumns(opr?.data[0] ? Object.keys(opr?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])

        setInterval(async () => {
            if (isEmpty(searchParams)) {
                opr = await getQueueJobs(queue, perPage)
            }
            else {
                opr = await searchQueueJob(queue, perPage, searchParams.column, searchParams.value)
            }
    
            setJobs(opr)
            setColumns(opr?.data[0] ? Object.keys(opr?.data[0]).filter(
                (column) => !excludedColumns.includes(column)
            ) : [])
        }, 300000)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let opr = {}
        if (isEmpty(searchParams)) {
            opr = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            opr = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(opr)) setJobs(opr)
    }

    const searchEntityColumn = async (column, value) => {
        const opr = await searchQueueJob(queue, 10, column, value)
        if (opr) setJobs(opr)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let opr = []
        if (isEmpty(searchParams)) {
            opr = await getQueueJobs(queue, 1000000000000)
        } else {
            opr = await searchQueueJob(queue, 1000000000000, searchParams.column, searchParams.value)
        }
        setJobs(opr)
    }

    const showJobHandler = (job) => {
        navigate("job-management", "show-job", job)
    }

    return (
        ! isEmpty(jobs) && 
        (
        <div>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={jobs.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={jobs.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showJobHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={jobs.links[1].url.split("?")[0] + "?take=" + jobs.per_page} numberOfPages={Math.ceil(parseFloat(jobs.total/jobs.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={jobs.links} perPage={jobs.per_page} total={jobs.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={jobs.total} perPage={jobs.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListJobs