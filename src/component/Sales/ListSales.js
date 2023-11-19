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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"
import Export from "../../layout/TableOperation/Export"


const ListSales = () => {

    const excludedColumns = [
        "id",
        "updated_at",
    ]

    const [columns, setColumns] = useState([])
    const [sales, setSales] = useState([])

    const { search } = useSearchApi()
    const { listSales } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const sls = await listSales()
        if (sls) setSales(sls)
        setColumns((sls[0] ? Object.keys(sls[0]) : []).filter(column => ! excludedColumns.includes(column)))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSearch = async (criteria) => {
        const sls = await search("sales", criteria)
        setSales(sls)
    }

    const addSalesHandler = () => {
        navigate("content", "add-sales")
    }

    const showSalesHandler = (sales) => {
        navigate("modal-content", "show-sales", sales)
    }

    const updateSalesHandler = (sales) => {
        navigate("content", "edit-sales", sales)
    }

    const deleteSalesHandler = (sales, onDelete) => {
        navigate("modal-content", "delete-sales", sales, onDelete)
    }

    return (
        <Page title="Sales">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Export columns={columns} rows={sales}/>
            </div>
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addSalesHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    {isEmpty(sales) ?
                    <div className="no-data">No Sales <i class="ms-3 fa-solid fa-ban"></i></div> :
                    <DataRows columns={columns} rows={sales}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showSalesHandler, {popup: true})}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateSalesHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteSalesHandler)}
                    </DataRows>}
                </TableBody>
            </Table>
        </Page>
    )
}

export default ListSales