import { useState } from "react"
import TextArea from "../../../layout/Shared/TextArea"
import ItemsList from "../../../layout/List/ItemsList"

const TextAreaAddition = ({ setRecipients }) => {

    const [numbers, setNumbers] = useState([])

    const onTextAreaContentChange = (content) => {
        let nums = [...new Set(content.split("\n").filter(n => n && n))].filter(Number)
        setNumbers(nums)
        setRecipients(nums)
    }

    const textInputFilter = (e) => {
        const keyCode = e.keyCode || e.which
        const keyValue = String.fromCharCode(keyCode)
      
        // Allow only numeric values (0-9), backspace key, enter key, Ctrl+A, Ctrl+V, Ctrl+Z, Ctrl+X, and Ctrl+C
        const isValid =
            /^[0-9\b]+$/.test(keyValue) ||
            keyCode === 13 || // Enter key
            (e.ctrlKey && (keyCode === 97 || keyCode === 65)) || // Ctrl+A (97 for regular A, 65 for numpad A)
            (e.ctrlKey && (keyCode === 118 || keyCode === 86)) || // Ctrl+V (118 for regular V, 86 for numpad V)
            (e.ctrlKey && keyCode === 90) || // Ctrl+Z
            (e.ctrlKey && keyCode === 88) || // Ctrl+X
            (e.ctrlKey && keyCode === 67); // Ctrl+C

      
        if (!isValid) {
          e.preventDefault()
        }
    }

    return (
        <div style={{marginTop: "120px"}}>
            <div className="d-flex">
                <div style={{width: "60%", marginTop: "10px"}}>
                    <TextArea placeholder={"Enter Recipient Numbers."} onContentChange={onTextAreaContentChange} textInputFilterFunction={textInputFilter}/>
                </div>
                <div style={{width: "40%"}}>
                    <ItemsList items={numbers}/>
                </div>
            </div>
       </div>
    )
}

export default TextAreaAddition