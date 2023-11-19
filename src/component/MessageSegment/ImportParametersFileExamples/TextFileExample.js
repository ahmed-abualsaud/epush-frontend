import messageExample from "../../../assets/image/message-example.png"
import textFileExample from "../../../assets/image/text-file-example.png"

const TextFileExample = () => {

    return (
        <div>
            <h1 style={{marginTop: "0"}} className="content-header">Example Message</h1>
            <div>
                <img style={{width: "100%"}} src={messageExample} alt="Avatar" />
            </div>

            <h1 className="content-header mt-5">Example Text File</h1>
            <div className="parametrized-textarea-note">NOTE: The parameter values is separeted with comma ",".</div>
            <div>
                <img style={{width: "100%", border: "1px solid #063F30"}} src={textFileExample} alt="Avatar" />
            </div>
        </div>
    )
}

export default TextFileExample