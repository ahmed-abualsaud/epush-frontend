import TextArea from "./TextArea"
import "../../assets/style/layout/parametrized-textarea.css"
import { beautifulToKebabCase, randomString } from "../../utils/helper"
import { getElement } from "../../utils/dom"
import { useEffect, useState } from "react"
import { generateMessagesUsingExcelFileParameters, generateMessagesUsingTextFileParameters, generateMessagesUsingWordFileParameters } from "../../utils/message"
import { render } from "../../setup/navigator"


const ParametrizedTextArea = ({ height, placeholder, onContentChange , textInputFilterFunction }) => {

    const componentKey = randomString(8)
    const parameters = [
    
        "{{name}}",
        "{{username}}",
        "{{email}}",
        "{{phone}}",
        "{{first_name}}",
        "{{last_name}}",
        "{{full_name}}",
        "{{age}}",
        "{{gender}}",
        "{{address}}",
        "{{balance}}",
        "{{cost}}",
        "{{price}}",
    
    ]

    const [content, setContent] = useState("")
    const [message, setMessage] = useState([])
    const [parameterized, setParameterized] = useState(false)

    const onTextAreaContentChange = (cnt) => {
        setContent(cnt)
    }

    useEffect(() => {
        onContentChange(parameterized ? message : content, parameterized)
    }, [content, message])

    const selectOptionOnClickHandler = (e, selectName) => {
        let label = e.currentTarget.querySelector('.textarea-toolbox-item-droplist-label')
        let option = label.getAttribute('data-value')
        let selectbox = getElement('select-option-' + beautifulToKebabCase(selectName))
        selectbox.setAttribute('data-option', option)
        selectbox.classList.remove('selectbox--active')
        
        if (selectName === "Select Parameters") {
            setContent(content + option)
        }

        if (option === "Excel File Example") {
            getElement("parametrize-messages-popup").click()
            render("modal-content", "excel-file-example")
        }

        if (option === "Word File Example") {
            getElement("parametrize-messages-popup").click()
            render("modal-content", "word-file-example")
        }

        if (option === "Text File Example") {
            getElement("parametrize-messages-popup").click()
            render("modal-content", "text-file-example")
        }
    }

    const handleOnChange = (e) => {
        const file = e.target.files[0]
        getElement("parametrized-textarea-selected-parameters-file-" + componentKey).innerText = file.name
        const reader = new FileReader()
        reader.onload = function (e) {
            e.target.attributes = file
            setParameterized(true)
            onSelectFile(e.target)
        }
        reader.readAsBinaryString(file)
    }

    const onSelectFile = (file) => {
        let messages = []
        let fileContent = file.result

        switch (file.attributes.type) {
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                messages = generateMessagesUsingWordFileParameters(content, fileContent)
                break

            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                messages = generateMessagesUsingExcelFileParameters(content, fileContent)
                break

            default:
                messages = generateMessagesUsingTextFileParameters(content, fileContent)
                break
        }

        setMessage({messages: messages, content: content})
        getElement("parametrize-messages-popup").click()
        render("modal-content", "message-list", messages)
    }

    const displayOptionsOnClickHandler = (e, selectName) => {
        getElement('select-option-' + beautifulToKebabCase(selectName))?.classList.toggle('selectbox--active')
    }


    return (
        <div className="parametrized-textarea-container">
            <a id="parametrize-messages-popup" className="d-none" href="#popup">popup</a>
            <div className="textarea-toolbox">
                <div id={"parametrized-textarea-selected-parameters-file-" + componentKey} className="parametrized-textarea-selected-parameters-file"></div>

                <div id="select-option-select-parameters" className="textarea-toolbox-item-container">
                    <div className="textarea-toolbox-item" onClick={(e) => displayOptionsOnClickHandler(e, "Select Parameters")}>
                        <span>Select Parameters</span>
                        <i class="fas fa-clipboard-list"></i>
                    </div>

                    <div className="textarea-toolbox-item-droplist-container">
                        {parameters.map(parameter => 
                            <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Select Parameters")} key={0}>
                                <input type="radio" className="textarea-toolbox-item-droplist-radio"/>
                                <label className="textarea-toolbox-item-droplist-label" data-value={parameter}>
                                    {parameter}
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div id="select-option-import-parameters-values" className="textarea-toolbox-item-container">
                    <div className="textarea-toolbox-item" onClick={(e) => displayOptionsOnClickHandler(e, "Import Parameters Values")}>
                        <span>Import Parameters Values</span>
                        <i class="fas fa-file-import"></i>
                    </div>
                    <div className="textarea-toolbox-item-droplist-container">
                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Parameters Values")} key={0}>
                            <input id="textarea-toolbox-import-excel" type="file" className="textarea-toolbox-item-droplist-radio" accept=".xls,.xlsx" onChange={handleOnChange}  onClick= { (e)=> { e.target.value = null }}/>
                            <label for="textarea-toolbox-import-excel" className="textarea-toolbox-item-droplist-label" data-value={"Import Excel"}>
                                {"Import Excel"}
                                <i class="fas fa-file-excel"></i>
                            </label>
                        </div>

                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Parameters Values")} key={0}>
                            <input id="textarea-toolbox-import-word" type="file" className="textarea-toolbox-item-droplist-radio" accept=".doc,.docx" onChange={handleOnChange}  onClick= { (e)=> { e.target.value = null }}/>
                            <label for="textarea-toolbox-import-word" className="textarea-toolbox-item-droplist-label" data-value={"Import Word"}>
                                {"Import Word"}
                                <i class="fas fa-file-word"></i>
                            </label>
                        </div>

                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Parameters Values")} key={0}>
                            <input id="textarea-toolbox-import-text" type="file" className="textarea-toolbox-item-droplist-radio" onChange={handleOnChange}  onClick= { (e)=> { e.target.value = null }}/>
                            <label for="textarea-toolbox-import-text" className="textarea-toolbox-item-droplist-label" data-value={"Import Text"}>
                                {"Import Text"}
                                <i class="fas fa-file-lines"></i>
                            </label>
                        </div>
                    </div>
                </div>

                <div id="select-option-import-examples" className="textarea-toolbox-item-container">
                    <div className="textarea-toolbox-item" onClick={(e) => displayOptionsOnClickHandler(e, "Import Examples")}>
                        <span>Import Examples</span>
                        <i class="fas fa-book"></i>
                    </div>
                    <div className="textarea-toolbox-item-droplist-container">
                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Examples")} key={0}>
                            <input type="radio" className="textarea-toolbox-item-droplist-radio"/>
                            <label className="textarea-toolbox-item-droplist-label" data-value={"Excel File Example"}>
                                {"Excel File Example"}
                            </label>
                        </div>

                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Examples")} key={0}>
                            <input type="radio" className="textarea-toolbox-item-droplist-radio"/>
                            <label className="textarea-toolbox-item-droplist-label" data-value={"Word File Example"}>
                                {"Word File Example"}
                            </label>
                        </div>

                        <div className="textarea-toolbox-item-droplist-option" onClick={(e) => selectOptionOnClickHandler(e, "Import Examples")} key={0}>
                            <input type="radio" className="textarea-toolbox-item-droplist-radio"/>
                            <label className="textarea-toolbox-item-droplist-label" data-value={"Text File Example"}>
                                {"Text File Example"}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <TextArea placeholder={placeholder} content={content} height={height} onContentChange={onTextAreaContentChange} textInputFilterFunction={textInputFilterFunction} disabled={parameterized}/>
            <div className="parametrized-textarea-note">NOTE: The parameters file must contain a "Phone" parameter column.</div>
            <div className="parametrized-textarea-note">NOTE: You should upload the parameters file after you finish writing the entire message because the text editor is disabled after uploading.</div>
        </div>
    )
}

export default ParametrizedTextArea