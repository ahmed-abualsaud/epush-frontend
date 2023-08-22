import '../../assets/style/layout/input.css'

const Input = ({ id, type, className, placeholder, validrules, accept, children, onFocus, onInput, style, maxLength }) => {

    return (
        <div className={`form-group my-2 ${className}`}>
            <input 
                style={style} 
                onFocus={onFocus}
                onInput={onInput}
                type={type} 
                name={id} 
                className="form-style" 
                placeholder={placeholder} 
                id={id} 
                autocomplete="off" 
                validrules={validrules} 
                accept={accept} 
                maxLength={maxLength ?? 10000} 
            />
            { children }
        </div>
    );
  };
  
  export default Input;