import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import useAuthApi from "../../api/useAuthApi"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../../utils/helper"
import ShowAll from "../../layout/TableOperation/ShowAll"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import Table from "../../layout/Table/Table"
import HeadRow from "../../layout/Table/HeadRow"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import { navigate } from "../../setup/navigator"
import TableHead from "../../layout/Table/TableHead"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"

const ListUsers = () =>
{
    const excludedColumns = [
        "userId", 
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

    const { search } = useSearchApi()
    const { listUsers, searchUser } = useAuthApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let usr= []
        if (isEmpty(searchParams)) {
            usr = await listUsers(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            usr = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
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

    const onSearch = async (criteria) => {
        const usr = await search("user", criteria, 10)
        if (usr) setUsers(usr)
        setSearchParams({entity: encodeString("user"), criteria: encodeString(criteria), enti: "user", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let usr = []
        if (isEmpty(searchParams)) {
            usr = await listUsers(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            usr = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            usr = await searchUser(1000000000000, searchParams.column, searchParams.value)
        }
        setUsers(usr)
    }



    const addUserHandler = () => {
        navigate("content", "add-user")
    }

    const showUserHandler = (user) => {
        navigate("content", "show-user", user)
    }

    const updateUserHandler = (user) => {
        navigate("content", "edit-user", user)
    }

    const deleteUserHandler = (user, onDelete) => {
        navigate("modal-content", "delete-user", user, onDelete)
    }

    return (
        ! isEmpty(users) && 
        (
        <>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns.filter(item => item !== "websites")} rows={users.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addUserHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={users.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showUserHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateUserHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteUserHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={users.links[1].url.split("?")[0] + "?take=" + users.per_page} numberOfPages={Math.ceil(parseFloat(users.total/users.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={users.links} perPage={users.per_page} total={users.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={users.total} perPage={users.per_page}/>
            </PaginationContainer>
        </>
        )
    )
}

export default ListUsers