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


const ListBusinessFields = () => {


    const [columns, setColumns] = useState([])
    const [businessFields, setBusinessFields] = useState([])
    const [deletedRows, setDeletedRows] = useState([])
    const { listBusinessFields } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listBusinessFields()
        if (prclst) setBusinessFields(prclst)
        setColumns(prclst[0] ? Object.keys(prclst[0]) : [])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addBusinessFieldHandler = () => {
      navigate("content", "add-business-field")
    }

    const showBusinessFieldHandler = (businessField) => {
        navigate("modal-content", "show-business-field", businessField)
    }

    const updateBusinessFieldHandler = (businessField) => {
        navigate("content", "edit-business-field", businessField)
    }

    const deleteBusinessFieldHandler = (businessField, deletedRows, setDeletedRows) => {
        navigate("modal-content", "delete-business-field", businessField, deletedRows, setDeletedRows)
    }

    return (
        <div className="component-container">
            <h1 className="content-header">All Business Field</h1>
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
        </div>
    )
}

export default ListBusinessFields