import PageInput from "../../layout/Pagination/PageInput"
import Paginator from "../../layout/Pagination/Paginator"
import useAxiosApi from "../../api/Api"
import Search from '../../layout/TableOperation/Search'
import Export from '../../layout/TableOperation/Export'
import { isEmpty } from "../../utils/helper"
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

const ListOrders = () =>
{
    const [orders, setOrders] = useState([])
    const [columns, setColumns] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [searchParams, setSearchParams] = useState({})

    const { listOrders, updateOrder, searchOrder } = useExpenseApi()
    const { sendGetRequest, sendPostRequest } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        let ord = []
        if (isEmpty(searchParams)) {
            ord = await listOrders(perPage)
        } else {
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
            ord = await sendPostRequest(pageUrl, searchParams)
        }
        if (! isEmpty(ord)) setOrders(ord)
    }

    const searchEntityColumn = async (column, value) => {
        const ord = await searchOrder(10, column, value)
        if (ord) setOrders(ord)
        setSearchParams({column: column, value: value})
    }

    const onCheckShowAll = async () => {
        let ord = []
        if (isEmpty(searchParams)) {
            ord = await listOrders(1000000000000)
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
        const userDate = new Date(e.currentTarget.value)
        const timezoneOffset = userDate.getTimezoneOffset() * 60000
        const localDate = new Date(userDate.getTime() - timezoneOffset)
        const selectedDateTime = localDate.toISOString().replace("T", " ").slice(0, 19)

        let newOrder = await updateOrder(currentOrder.id, {
            collection_date: selectedDateTime
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
        <div className="add-user-container">
            <h1 className="add-user-header">Orders</h1>
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
                    <DataRows columns={columns} rows={orders.data.map(order => {
                        order.company_name = order.client?.company_name ?? "NULL"
                        order.sales_name = order.client?.sales?.name ?? "NULL"
                        order.pricelist = order.pricelist?.name ?? "NULL"
                        order.payment_method = order.payment_method?.name ?? "NULL"
                        return order
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showOrderHandler)}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateOrderHandler)}
                        {withOperationCellParameters(OperationRowCell, "operationFunction", setChosenOrder, {
                            children: <div style={{color: "#FFBB00"}} className="date-button-icon">
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
        </div>
        )
    )
}

export default ListOrders