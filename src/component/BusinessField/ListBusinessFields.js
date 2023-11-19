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


const ListBusinessFields = () => {

    const excludedColumns = [
        "id",
        "updated_at",
    ]

    const [columns, setColumns] = useState([])
    const [businessFields, setBusinessFields] = useState([])

    const { search } = useSearchApi()
    const { listBusinessFields } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const bsnfld = await listBusinessFields()
        if (bsnfld) setBusinessFields(bsnfld)
        setColumns((bsnfld[0] ? Object.keys(bsnfld[0]) : []).filter(column => ! excludedColumns.includes(column)))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSearch = async (criteria) => {
        const bsnfld = await search("business_field", criteria)
        setBusinessFields(bsnfld)
    }

    const addBusinessFieldHandler = () => {
      navigate("content", "add-business-field")
    }

    const showBusinessFieldHandler = (businessField) => {
        navigate("modal-content", "show-business-field", businessField)
    }

    const updateBusinessFieldHandler = (businessField) => {
        navigate("content", "edit-business-field", businessField)
    }

    const deleteBusinessFieldHandler = (businessField, onDelete) => {
        navigate("modal-content", "delete-business-field", businessField, onDelete)
    }

    return (
        <Page title="Business Field">
            <ComplexSearch columns={columns} onSearch={onSearch}/>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Export columns={columns} rows={businessFields}/>
            </div>
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addBusinessFieldHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    {isEmpty(businessFields) ?
                    <div className="no-data">No Business Fields <i class="ms-3 fa-solid fa-ban"></i></div> :
                    <DataRows columns={columns} rows={businessFields}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showBusinessFieldHandler, {popup: true})}
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateBusinessFieldHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteBusinessFieldHandler)}
                    </DataRows>}
                </TableBody>
            </Table>
        </Page>
    )
}

export default ListBusinessFields