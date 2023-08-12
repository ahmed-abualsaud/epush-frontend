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


const ListPaymentMethods = () => {


    const [columns, setColumns] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [deletedRows, setDeletedRows] = useState([])
    const { listPaymentMethods } = useExpenseApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listPaymentMethods()
        if (prclst) setPaymentMethods(prclst)
        setColumns(prclst[0] ? Object.keys(prclst[0]) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addPaymentMethodHandler = () => {
        navigate("content", "add-payment-method")
    }

    const showPaymentMethodHandler = (paymentMethod) => {
        navigate("modal-content", "show-payment-method", paymentMethod)
    }

    const updatePaymentMethodHandler = (paymentMethod) => {
        navigate("content", "edit-payment-method", paymentMethod)
    }

    const deletePaymentMethodHandler = (paymentMethod, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-payment-method", paymentMethod, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(paymentMethods) && 
        (
            <div className="add-user-container">
                <h1 className="add-user-header">All Payment Method</h1>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                            <AddRowCell addingFunction={addPaymentMethodHandler}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={paymentMethods}>
                            {withOperationCellParameters(ShowRowCell, "showFunction", showPaymentMethodHandler, {popup: true})}
                            {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePaymentMethodHandler)}
                            {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePaymentMethodHandler)}
                        </DataRows>
                    </TableBody>
                </Table>
            </div>
        )
    )
}

export default ListPaymentMethods