import { useEffect, useRef, useState } from 'react';
import '../../assets/style/layout/input.css'
import { isEmpty } from '../../utils/helper';
import { getElement } from '../../utils/dom';

const ExtendedInput = ({ type, values, defaultValue, className, options, placeholder, validrules, accept, children, onFocus, onInput, onChange, onKeyDown, style, maxLength, pattern, required, setUpdatedValues, icon }) => {

    const [inputs, setInputs] = useState([])
    const [display, setDisplay] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [currentOptions, setCurrentOptions] = useState(options)

    const setupLock = useRef(true)
    const setup = async () => {
        setInputs(isEmpty(values) ? [{ id: 0, value: '' }] : [...values.map((value, index) => {return { id: index, value: value}}), { id: values.length, value: '' }])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

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

    const onFocusHandler = (e, id) => {

        if (! isEmpty(options)) {
            setShowOptions(true)
        }

        if (id === inputs.length - 1) {
            setInputs([...inputs, { id: id + 1, value: '' }]);
        }

        onFocus && onFocus(e)
    }

    const onChangeHandler = (e, id) => {

        if (! isEmpty(options)) {
            setShowOptions(true)
        }

        const newInputs = [...inputs];
        newInputs[id].value = e.target.value;
        setInputs(newInputs);

        onChange && onChange(e)
        setUpdatedValues && setUpdatedValues(inputs.map(input => input.value).filter(input => input && input))

    }

    const onMouseLeaveHandler = () => {

        if (! isEmpty(options)) {
            setShowOptions(false)
        }
    }

    const selectOption = (option, id) => {
        getElement(id).value = option
        setShowOptions(false)
    }

    return (
        inputs.map(input => 
            <div 
                onMouseLeave={onMouseLeaveHandler}
                className={`form-group my-2 ${className}`}
            >
                <input
                    style={style}
                    onFocus={(e) => onFocusHandler(e, input.id)}
                    onChange={(e) => onChangeHandler(e, input.id)}
                    onInput={(e) => onInputHandler(e, input.id)}
                    onKeyDown={onKeyDown}
                    type={type === "password" ? (display ? "text" : "password") : type}
                    name={input.value}
                    className="form-style"
                    placeholder={placeholder}
                    id={input.id}
                    autocomplete="off"
                    validrules={validrules}
                    accept={accept}
                    maxLength={maxLength ?? 10000}
                    value={input.value}
                    defaultValue={defaultValue}
                    pattern={pattern}
                    required={required}
                />
                {type === "password" && <i className={`show-password-icon fas ${display ? 'fa-eye-slash' : 'fa-eye'}`} onClick={handlePasswordDisplay}></i>}
                <i className={"input-icon " + icon}></i>
                { children }

                {! isEmpty(options) && 
                <div className={`input-options ${showOptions ? "d-block" : "d-none"}`}>
                {currentOptions.map(option => 
                    <div className="input-option" onClick={() => selectOption(option, input.id)}>
                        {option}
                    </div>
                )}
                </div>}
            </div>
        )
    );
  };
  
  export default ExtendedInput;