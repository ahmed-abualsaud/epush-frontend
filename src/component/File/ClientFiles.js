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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import { useSelector } from "react-redux"


const ClientFiles = () =>
{
    const [columns, setColumns] = useState([])
    const [files, setFiles] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let msg = []
        if (isEmpty(searchParams)) {
            let criteria = "user_id = " + user?.user?.id
            setSearchParams({entity: encodeString("file"), criteria: encodeString(criteria), enti: "file", crit: criteria})
            msg = await search("file", criteria, perPage)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, perPage)
        }
         
        setFiles(msg)
        setColumns([
            // "folder_name", 
            "file_name", 
            "created_at"
        ])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let msg = {}
        if (isEmpty(searchParams)) {
            msg = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            msg = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(msg)) setFiles(msg)
    }

    const searchEntityColumn = async (column, value) => {
        let criteria = "user_id = " + user?.user?.id + " AND " + column + " LIKE '%" + value + "%'"
        const msg = await search("file", criteria, 10)
        if (msg) setFiles(msg)
        setSearchParams({entity: encodeString("file"), criteria: encodeString(criteria), enti: "file", crit: criteria})
    }

    const onSearch = async (criteria) => {
        criteria = "user_id = " + user?.user?.id + " AND " + criteria
        const msg = await search("file", criteria, 10)
        if (msg) setFiles(msg)
        setSearchParams({entity: encodeString("file"), criteria: encodeString(criteria), enti: "file", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let msg = []
        if (isEmpty(searchParams)) {
            msg = await search("file", "user_id = " + user?.user?.id , 1000000000000)
        } else {
            msg = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setFiles(msg)
    }

    const addFileHandler = () => {
        navigate("content", "upload-file")
    }

    const showFileHandler = (file) => {
        navigate("content", "show-file", file)
    }

    return (
        ! isEmpty(files) && 
        (
        <div>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={files.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        {/* <AddRowCell className="w-110px" addingFunction={addFileHandler}/> */}
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={files.data.map(file => {
                        let filePath = file.url.split('/')
                        file.file_name = filePath[filePath.length - 1]
                        return file
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showFileHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={files.links[1].url.split("?")[0] + "?take=" + files.per_page} numberOfPages={Math.ceil(parseFloat(files.total/files.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={files.links} perPage={files.per_page} total={files.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={files.total} perPage={files.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ClientFiles