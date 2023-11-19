import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../../utils/helper"
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
import ComplexSearch from "../../layout/TableOperation/ComplexSearch"
import useSearchApi from "../../api/useSearchApi"
import Page from "../../page/Page"
import Export from "../../layout/TableOperation/Export"


const ListPricelist = () => {

    const excludedColumns = [
        "id",
        "updated_at",
    ]

    const [columns, setColumns] = useState([])
    const [pricelists, setPricelists] = useState([])

    const { search } = useSearchApi()
    const { listPricelists } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listPricelists()
        if (prclst) setPricelists(prclst)
        setColumns((prclst[0] ? Object.keys(prclst[0]) : []).filter(column => ! excludedColumns.includes(column)))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSearch = async (criteria) => {
        const prclst = await search("pricelist", criteria)
        if (prclst) setPricelists(prclst)
    }

    const addPricelistHandler = () => {
        navigate("content", "add-pricelist")
    }

    const showPricelistHandler = (pricelist) => {
        navigate("modal-content", "show-pricelist", pricelist)
    }

    const updatePricelistHandler = (pricelist) => {
        navigate("content", "edit-pricelist", pricelist)
    }

    const deletePricelistHandler = (pricelist, onDelete) => {
        navigate("modal-content", "delete-pricelist", pricelist, onDelete)
    }

    return ( 
        <Page title="Pricelist">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Export columns={columns} rows={pricelists}/>
            </div>
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addPricelistHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    {isEmpty(pricelists) ?
                    <div className="no-data">No Pricelists <i class="ms-3 fa-solid fa-ban"></i></div> :
                    <DataRows columns={columns} rows={pricelists}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showPricelistHandler, {popup: true})}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updatePricelistHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deletePricelistHandler)}
                    </DataRows>}
                </TableBody>
            </Table>
        </Page>
    )
}

export default ListPricelist