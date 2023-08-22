import useFileApi from '../../api/useFileApi'
import '../../assets/style/layout/export.css'

const Export = ({ columns, rows }) => {

    const { exportExcel, exportPDF } = useFileApi()

    const exportToExcel = async () => {
        await exportExcel(columns, rows.map(obj => columns.map(key => obj[key])))
    }

    const exportToPDF = async () => {
        await exportPDF(columns, rows.map(obj => columns.map(key => obj[key])))
    }

    return (
        <div className="export-container">
            <div className="export-header">Export</div>
            <div className="export-buttons">
                <div className="export-button" onClick={exportToExcel}>Excel<i class="fas fa-file-excel"></i></div>
                <div className="export-button" onClick={exportToPDF}>PDF<i class="fas fa-file-pdf"></i></div>
            </div>
        </div>
    )
}

export default Export