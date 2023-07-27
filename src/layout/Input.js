import '../assets/style/layout/input.css'

const Input = ({ id, type, className, placeholder, validrules, accept, children }) => {

    return (
        <div className={`form-group my-2 ${className}`}>
            <input type={type} name={id} className="form-style" placeholder={placeholder} id={id} autocomplete="off" validrules={validrules} accept={accept}/>
            { children }
        </div>
    );
  };
  
  export default Input;