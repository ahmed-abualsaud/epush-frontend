import { useState } from 'react';
import '../../assets/style/layout/input.css'
import { isEmpty } from '../../utils/helper';
import { getElement } from '../../utils/dom';
import { randomString } from '../../utils/strUtils';

const Input = ({ id, type, value, defaultValue, className, options, placeholder, validrules, accept, children, onFocus, onChange, onInput, onKeyDown, style, maxLength, pattern, required, icon }) => {

    const componentKey = randomString(8)
    const [display, setDisplay] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [currentOptions, setCurrentOptions] = useState(options)

    const handlePasswordDisplay = () => {
        setDisplay(oldValue => ! oldValue)
    }

    const onInputHandler = (e) => {

        if (! isEmpty(options)) {
            setShowOptions(true)
            setCurrentOptions(options.filter(option => option?.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
        }

        onInput && onInput(e)
    }

    const onFocusHandler = (e) => {

        if (! isEmpty(options)) {
            setShowOptions(true)
        }

        onFocus && onFocus(e)
    }

    const onMouseLeaveHandler = () => {

        if (! isEmpty(options)) {
            setShowOptions(false)
        }
    }

    const selectOption = (option) => {
        getElement(id ?? ("input-" + componentKey)).value = option
        setShowOptions(false)
    }

    return (
        <div 
            onMouseLeave={onMouseLeaveHandler}
            className={`form-group my-2 ${className}`}
        >
            <input
                style={style}
                onFocus={onFocusHandler}
                onInput={onInputHandler}
                onChange={onChange}
                onKeyDown={onKeyDown}
                type={type === "password" ? (display ? "text" : "password") : type}
                name={id ?? ("input-" + componentKey)}
                className="form-style"
                placeholder={placeholder}
                id={id ?? ("input-" + componentKey)}
                autocomplete="off"
                validrules={validrules}
                accept={accept}
                maxLength={maxLength ?? 10000}
                value={value}
                defaultValue={defaultValue}
                pattern={pattern}
                required={required}
            />
            {type === "password" && <i className={`show-password-icon fas ${display ? 'fa-eye-slash' : 'fa-eye'}`} onClick={handlePasswordDisplay}></i>}
            {icon && <i className={"input-icon " + icon}></i>}
            { children }

            {! isEmpty(options) && 
            <div className={`input-options ${showOptions ? "d-block" : "d-none"}`}>
            {currentOptions.map(option => 
                <div className="input-option" onClick={() => selectOption(option)}>
                    {option}
                </div>
            )}
            </div>}
        </div>
    );
  };
  
  export default Input;