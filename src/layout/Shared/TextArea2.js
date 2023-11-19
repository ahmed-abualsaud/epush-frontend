import "../../assets/style/layout/textarea2.css"

const TextArea2 = ({ content, height, placeholder, onContentChange , textInputFilterFunction, disabled, readonly }) => {

    const handleKeyPress = (e) => {
        textInputFilterFunction && textInputFilterFunction(e)
    }

    const onChangeHandler = (e) => {
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
        onContentChange && onContentChange(e.target.value)
    }


    return (
        <div className="textarea2-wrapper">
            <textarea 
                defaultValue={content}
                className="textarea2" 
                placeholder={placeholder} 
                name="text" 
                style={{height: height ?? "75px"}}
                onKeyDown={handleKeyPress}
                onChange={onChangeHandler}
                disabled={disabled}
                readOnly={readonly}
            ></textarea> 

            <i className={`fas fa-lock textarea2-lock ${ disabled || readonly ? 'd-block' : 'd-none'}`}></i>

        </div>
    )
}

export default TextArea2