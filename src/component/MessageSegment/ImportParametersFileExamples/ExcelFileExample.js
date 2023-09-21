import messageExample from "../../../assets/image/message-example.png"
import excelFileExample from "../../../assets/image/excel-file-example.png"

const ExcelFileExample = () => {

    return (
        <div className="add-user-container">
            <h1 className="add-user-header">Example Message</h1>
            <div>
                <img style={{width: "100%"}} src={messageExample} alt="Avatar" />
            </div>

            <h1 className="add-user-header mt-5">Example Excel File</h1>
            <div>
                <img style={{width: "100%", border: "1px solid #063F30"}} src={excelFileExample} alt="Avatar" />
            </div>
        </div>
    )
}

export default ExcelFileExample