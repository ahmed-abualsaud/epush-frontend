import { navigate } from "../../setup/navigator"
import useExpenseApi from "../../api/useExpenseApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../../utils/helper"
import TableHead from "../../layout/Table/TableHead"
import HeadRow from "../../layout/Table/HeadRow"
import HeadCells from "../../layout/Table/HeadCells"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import Table from "../../layout/Table/Table"
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"
import Export from "../../layout/TableOperation/Export"


const ListPaymentMethods = () => {

    const excludedColumns = [
        "id",
        "updated_at",
    ]

    const [columns, setColumns] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])

    const { search } = useSearchApi()
    const { listPaymentMethods } = useExpenseApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const pymtd = await listPaymentMethods()
        if (pymtd) setPaymentMethods(pymtd)
        setColumns((pymtd[0] ? Object.keys(pymtd[0]) : []).filter(column => ! excludedColumns.includes(column)))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSearch = async (criteria) => {
        const pymtd = await search("payment_method", criteria)
        if (pymtd) setPaymentMethods(pymtd)
    }

    const addPaymentMethodHandler = () => {
        navigate("content", "add-payment-method")
    }

    const showPaymentMethodHandler = (paymentMethod) => {
        navigate("modal-content", "show-payment-method", paymentMethod)
    }

    const updatePaymentMethodHandler = (paymentMethod) => {
        navigate("content", "edit-payment-method", paymentMethod)
    }

    const deletePaymentMethodHandler = (paymentMethod, onDelete) => {
        navigate("modal-content", "delete-payment-method", paymentMethod, onDelete)
    }

    return (
        <Page title="Payment Methods">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Export columns={columns} rows={paymentMethods}/>
            </div>
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addPaymentMethodHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    {isEmpty(paymentMethods) ?
                    <div className="no-data">No Payment Methods <i class="ms-3 fa-solid fa-ban"></i></div> :
                    <DataRows columns={columns} rows={paymentMethods}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showPaymentMethodHandler, {popup: true})}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePaymentMethodHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePaymentMethodHandler)}
                    </DataRows>}
                </TableBody>
            </Table>
        </Page>
    )
}

export default ListPaymentMethods