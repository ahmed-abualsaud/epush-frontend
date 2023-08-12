import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import useCoreApi from "../../api/useCoreApi"
import DataRows from "../../layout/Table/DataRows"
import HeadCells from "../../layout/Table/HeadCells"
import HeadRow from "../../layout/Table/HeadRow"
import Table from "../../layout/Table/Table"
import TableBody from "../../layout/Table/TableBody"
import TableHead from "../../layout/Table/TableHead"
import AddRowCell from "../../layout/TableOperation/AddRowCell"
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import UpdateRowCell from "../../layout/TableOperation/UpdateRowCell"
import { navigate } from "../../setup/navigator"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../../utils/helper"


const ListSales = () => {


    const [columns, setColumns] = useState([])
    const [sales, setSales] = useState([])
    const { listSales } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listSales()
        if (prclst) setSales(prclst)
        setColumns(prclst[0] ? Object.keys(prclst[0]) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addSalesHandler = () => {
        navigate("content", "add-sales")
    }

    const showSalesHandler = (sales) => {
        navigate("modal-content", "show-sales", sales)
    }

    const updateSalesHandler = (sales) => {
        navigate("content", "edit-sales", sales)
    }

    const deleteSalesHandler = (sales, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-sales", sales, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(sales) && 
        (
            <div className="add-user-container">
                <h1 className="add-user-header">All Sales</h1>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                            <AddRowCell addingFunction={addSalesHandler}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={sales}>
                            {withOperationCellParameters(ShowRowCell, "showFunction", showSalesHandler, {popup: true})}
                            {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSalesHandler)}
                            {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSalesHandler)}
                        </DataRows>
                    </TableBody>
                </Table>
            </div>
        )
    )
}

export default ListSales