import messageExample from "../../../assets/image/message-example.png"
import textFileExample from "../../../assets/image/text-file-example.png"

const TextFileExample = () => {

    return (
        <div className="add-user-container">
            <h1 className="add-user-header">Example Message</h1>
            <div>
                <img style={{width: "100%"}} src={messageExample} alt="Avatar" />
            </div>

            <h1 className="add-user-header mt-5">Example Text File</h1>
            <div className="parametrized-textarea-note">NOTE: The parameter values is separeted with comma ",".</div>
            <div>
                <img style={{width: "100%", border: "1px solid #063F30"}} src={textFileExample} alt="Avatar" />
            </div>
        </div>
    )
}

export default TextFileExample