import messageExample from "../../../assets/image/message-example.png"
import wordFileExample from "../../../assets/image/word-file-example.png"

const WordFileExample = () => {

    return (
        <div className="component-container">
            <h1 className="content-header">Example Message</h1>
            <div>
                <img style={{width: "100%"}} src={messageExample} alt="Avatar" />
            </div>

            <h1 className="content-header mt-5">Example Word File</h1>
            <div className="parametrized-textarea-note">NOTE: The parameter values is separeted with comma ",".</div>
            <div>
                <img style={{width: "100%", border: "1px solid #063F30"}} src={wordFileExample} alt="Avatar" />
            </div>
        </div>
    )
}

export default WordFileExample