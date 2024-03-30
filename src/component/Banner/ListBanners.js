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
import DeleteRowCell from "../../layout/TableOperation/DeleteRowCell"
import Page from "../../page/Page"


const ListBanner = () => {

    const excludedColumns = [
        "id",
        "updated_at",
    ]

    const [columns, setColumns] = useState([])
    const [banners, setBanners] = useState([])

    const { listBanners } = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listBanners()
        if (prclst) setBanners(prclst)
        setColumns((prclst[0] ? Object.keys(prclst[0]) : []).filter(column => ! excludedColumns.includes(column)))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    const addBannerHandler = () => {
        navigate("content", "add-banner")
    }

    const showBannerHandler = (banner) => {
        navigate("content", "show-banner", banner)
    }

    const deleteBannerHandler = (banner, onDelete) => {
        navigate("modal-content", "delete-banner", banner, onDelete)
    }

    return ( 
        <Page title="Banner">
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={columns}/>
                        <AddRowCell addingFunction={addBannerHandler}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    {isEmpty(banners) ?
                    <div className="no-data">No Banners <i class="ms-3 fa-solid fa-ban"></i></div> :
                    <DataRows columns={columns} rows={banners}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", showBannerHandler)}
                        {withOperationCellParameters(DeleteRowCell, "deleteFunction", deleteBannerHandler)}
                    </DataRows>}
                </TableBody>
            </Table>
        </Page>
    )
}

export default ListBanner