import messageExample from "../../../assets/image/message-example.png"
import excelFileExample from "../../../assets/image/excel-file-example.png"

const ExcelFileExample = () => {

    return (
        <div>
            <h1 style={{marginTop: "0"}} className="content-header">Example Message</h1>
            <div>
                <img style={{width: "100%"}} src={messageExample} alt="Avatar" />
            </div>

            <h1 className="content-header mt-5">Example Excel File</h1>
            <div>
                <img style={{width: "100%", border: "1px solid #063F30"}} src={excelFileExample} alt="Avatar" />
            </div>
        </div>
    )
}

export default ExcelFileExample