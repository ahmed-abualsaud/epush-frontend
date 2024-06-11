import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { getDatetimeString, isEmpty, roleExists } from "../../utils/helper"
import PerPageDropList from "../../layout/Pagination/PerPageDropList"
import { useEffect, useRef, useState } from "react"
import ShowAll from "../../layout/TableOperation/ShowAll"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import { navigate } from "../../setup/navigator"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import HeadRow from "../../layout/Table/HeadRow"
import PaginationContainer from "../../layout/Pagination/PaginationContainer"
import PaginationInfo from "../../layout/Pagination/PaginationInfo"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import OperationContainer from "../../layout/TableOperation/OperationContainer"
import useExpenseApi from "../../api/useExpenseApi"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import OperationRowCell from "../../layout/TableOperation/OperationRowCell"
import { showAlert } from "../../utils/validator"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import { encodeString } from "../../utils/strUtils"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"

const ListOrders = () =>
{
    const [orders, setOrders] = useState([])
    const [columns, setColumns] = useState([])
    const [authUser, setAuthUser] = useState({})
    const [currentOrder, setCurrentOrder] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { search } = useSearchApi()
    const { sendGetRequest, sendPostRequest, getAuthenticatedUser } = useAxiosApi()
    const { listOrders, updateOrder, searchOrder } = useExpenseApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        setAuthUser(getAuthenticatedUser())

        let ord = []
        if (isEmpty(searchParams)) {
            ord = await listOrders(perPage)
        }
        else if (searchParams.hasOwnProperty('criteria')) {
            ord = await search(searchParams.enti, searchParams.crit, perPage)
        }
        else {
            ord = await searchOrder(perPage, searchParams.column, searchParams.value)
        }
        setOrders(ord)
        setColumns(["credit", "company_name", "sales_name", "pricelist", "payment_method", "collection_date", "created_at"])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(10) }
    }, [])

    const handleGetPage = async (pageUrl) => {
        let ord = {}
        if (isEmpty(searchParams)) {
            ord = await sendGetRequest(pageUrl)
        } else {
            if (! pageUrl.includes("search")) {
                let url  = pageUrl.split("?")
                pageUrl = url[0]+"/search?"+url[1]
            }
            let params = {...searchParams}
            if (roleExists(authUser.roles, "partner")) {
                params.partner_id = authUser.user.id
            }
            ord = await sendPostRequest(pageUrl, params)
        }

        if (! isEmpty(ord)) setOrders(ord)
    }

    const searchEntityColumn = async (column, value) => {
        const ord = await searchOrder(10, column, value)
        if (ord) setOrders(ord)
        setSearchParams({column: column, value: value})
    }

    const onSearch = async (criteria) => {
        if (roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }
        const ord = await search("order", criteria, 10)
        if (ord) setOrders(ord)
        setSearchParams({entity: encodeString("order"), criteria: encodeString(criteria), enti: "order", crit: criteria})
    }

    const onCheckShowAll = async () => {
        let ord = []
        if (isEmpty(searchParams)) {
            ord = await listOrders(1000000000000)
        } else if (searchParams.hasOwnProperty('criteria')) {
            ord = await search(searchParams.enti, searchParams.crit, 1000000000000)
        } else {
            ord = await searchOrder(1000000000000, searchParams.column, searchParams.value)
        }
        setOrders(ord)
    }


    const addOrderHandler = () => {
        navigate("content", "add-order")
    }

    const updateOrderHandler = (order) => {
        navigate("content", "edit-order", order)
    }

    const showOrderHandler = (order) => {
        navigate("content", "show-order", order)
    }

    const setChosenOrder = (order) => {
        setCurrentOrder(order)
    }

    const collectOrderHandler = async (e) => {
        let newOrder = await updateOrder(currentOrder.id, {
            collection_date: getDatetimeString(e.currentTarget.value)
        })

        if (! isEmpty(newOrder)) {
            showAlert("Order Collected Successfully!")
        } else {
            showAlert("Failed To Collect The Order")
        }

        let ord = []
        if (isEmpty(searchParams)) {
            ord = await listOrders(orders.per_page)
        } else {
            ord = await searchOrder(orders.per_page, searchParams.column, searchParams.value)
        }
        setOrders(ord)
    }

    return (
        ! isEmpty(orders) && 
        (
        <Page title="Orders">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <OperationContainer>
                <ShowAll onCheck={onCheckShowAll}/>
                <Search columns={columns} searchColumn={searchEntityColumn}/>
                <Export columns={columns} rows={orders.data}/>
            </OperationContainer>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell className="w-110px" addingFunction={addOrderHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={columns} rows={orders?.data?.map(order => {
                        order.company_name = order.company_name ?? order.client?.company_name ?? "NULL"
                        order.sales_name = order.sales_name ?? order.client?.sales?.name ?? "NULL"
                        order.pricelist = order.pricelist_name ?? order.pricelist?.name ?? "NULL"
                        order.payment_method = order.payment_method_name ?? order.payment_method?.name ?? "NULL"
                        return order
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showOrderHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateOrderHandler)}
                        {withOperationCellParameters(OperationRowCell, "operationFunction", setChosenOrder, {
                            children: <div style={{color: "#FFBB00", padding: "0"}} className="date-button-icon">
                                        <i className="fas fa-coins"></i>
                                        <input
                                            id="date-time-input"
                                            type="datetime-local"
                                            className="date-button-input"
                                            onInput={collectOrderHandler}
                                        />
                                    </div>
                        })}
                    </DataRows>
                </TableBody>
            </Table>

            <PaginationContainer>
                <PageInput url={orders.links[1].url.split("?")[0] + "?take=" + orders.per_page} numberOfPages={Math.ceil(parseFloat(orders.total/orders.per_page))} setPageHandler={handleGetPage} />
                <Paginator links={orders.links} perPage={orders.per_page} total={orders.total} getPageHandler={ handleGetPage }/>
                <PerPageDropList perPageHandler={ setup }/>
                <PaginationInfo total={orders.total} perPage={orders.per_page}/>
            </PaginationContainer>
        </Page>
        )
    )
}

export default ListOrders