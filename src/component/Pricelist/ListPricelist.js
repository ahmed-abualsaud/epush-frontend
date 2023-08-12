import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import Table from "../../layout/Table/Table"
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


const ListPricelist = () => {


    const [columns, setColumns] = useState([])
    const [pricelists, setPricelists] = useState([])
    const { listPricelists } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listPricelists()
        if (prclst) setPricelists(prclst)
        setColumns(prclst[0] ? Object.keys(prclst[0]) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addPricelistHandler = () => {
        navigate("content", "add-pricelist")
    }

    const showPricelistHandler = (pricelist) => {
        navigate("modal-content", "show-pricelist", pricelist)
    }

    const updatePricelistHandler = (pricelist) => {
        navigate("content", "edit-pricelist", pricelist)
    }

    const deletePricelistHandler = (pricelist, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-pricelist", pricelist, deletedRows, setDeletedRows)
    }

    return (
        ! isEmpty(pricelists) && 
        (
            <div className="add-user-container">
                <h1 className="add-user-header">All Pricelist</h1>
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={columns}/>
                            <AddRowCell addingFunction={addPricelistHandler}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={columns} rows={pricelists}>
                            {withOperationCellParameters(ShowRowCell, "showFunction", showPricelistHandler, {popup: true})}
                            {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePricelistHandler)}
                            {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePricelistHandler)}
                        </DataRows>
                    </TableBody>
                </Table>
            </div>
        )
    )
}

export default ListPricelist