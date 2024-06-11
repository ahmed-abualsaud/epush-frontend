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
import { navigate } from "../../setup/navigator"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import DataRows from "../../layout/Table/DataRows"
import TableBody from "../../layout/Table/TableBody"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import HeadRow from "../../layout/Table/HeadRow"
import TableHead from "../../layout/Table/TableHead"
import Table from "../../layout/Table/Table"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import { encodeString } from "../../utils/strUtils"


const ListPartners = () =>
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
        "partnerId", 
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

    const [partners, setPartners] = useState([])
    const [columns, setColumns] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { listPartners } = useCoreApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let adm = []
        if (isEmpty(searchParams)) {
            adm = await listPartners(perPage)
        } else {
            adm = await search(searchParams.enti, searchParams.crit, perPage)
        }

        setPartners(adm)
        setColumns(adm?.data[0] ? Object.keys(adm?.data[0]).filter(
            (column) => !excludedColumns.includes(column)
        ) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let adm = {}
        if (isEmpty(searchParams)) {
            adm = await sendGetRequest(pageUrl)
            adm.data = normalizeUsers(adm.data)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            adm = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(adm)) setPartners(adm)
    }

    const searchEntityColumn = async (column, value) => {
        let criteria = column + " LIKE '%" + value + "%'"
        const adm = await search("partner", criteria, 10)
        if (adm) setPartners(adm)
        setSearchParams({entity: encodeString("partner"), criteria: encodeString(criteria), enti: "partner", crit: criteria})
    }

    const onSearch = async (criteria) => {
        const adm = await search("partner", criteria, 10)
        if (adm) setPartners(adm)
        setSearchParams({entity: encodeString("partner"), criteria: encodeString(criteria), enti: "partner", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let adm = []
        if (isEmpty(searchParams)) {
            adm = await listPartners(1000000000000)
        } else {
            adm = await search(searchParams.enti, searchParams.crit, 1000000000000)
        }
        setPartners(adm)
    }

    const addPartnerHandler = () => {
        navigate("content", "add-partner")
    }

    const showPartnerHandler = (partner) => {
        navigate("content", "show-partner", partner)
    }

    const updatePartnerHandler = (partner) => {
        navigate("content", "edit-partner", partner)
    }

    const deletePartnerHandler = (partner, onDelete) => {
        navigate("modal-content", "delete-partner", partner, onDelete)
    }

    return (
        ! isEmpty(partners) && 
        (
        <div>
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={partners.data}/>
                <AddRowCell addingFunction={addPartnerHandler}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addPartnerHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={partners.data}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showPartnerHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePartnerHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePartnerHandler)}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={partners.links[1].url.split("?")[0] + "?take=" + partners.per_page} numberOfPages={Math.ceil(parseFloat(partners.total/partners.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={partners.links} perPage={partners.per_page} total={partners.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={partners.total} perPage={partners.per_page}/>
            </PaginationContainer>
        </div>
        )
    )
}

export default ListPartners