import "../../assets/style/layout/textarea.css"

const 
TextArea = ({ content, height, placeholder, onContentChange , textInputFilterFunction, disabled}) => {

    const handleKeyPress = (e) => {
        textInputFilterFunction && textInputFilterFunction(e)
    }

    const onInputHandler = (e) => {
        e.target.style.height = height ?? "75px";
  
        // Get the computed styles for the element
        let computed = window.getComputedStyle(e.target);

        // Calculate the height
        let calcHeight = parseInt(computed.getPropertyValue("border-top-width"),10)
                    + parseInt(computed.getPropertyValue("padding-top"),10)
                    + e.target.scrollHeight
                    + parseInt(computed.getPropertyValue("padding-bottom"),10)
                    + parseInt(computed.getPropertyValue("border-bottom-width"),10);

        // Set the height
        e.target.style.height = calcHeight + "px";
        onContentChange(e.target.value)
    }

    return (
        <div className="textarea-wrapper">
            <textarea 
                value={content}
                className="textarea" 
                placeholder={placeholder} 
                name="text" 
                style={{height: height ?? "75px"}}
                onKeyDown={handleKeyPress}
                onInput={onInputHandler}
                disabled={disabled}
            ></textarea>  
        </div>
    )
}

export default TextArea