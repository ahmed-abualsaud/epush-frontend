import '../assets/style/layout/input.css'

const Input = ({ id, type, placeholder, validrules, children }) => {

    return (
        <div className="form-group my-2">
            <input type={type} name={id} className="form-style" placeholder={placeholder} id={id} autocomplete="off" validrules={validrules}/>
            { children }
        </div>
    );
  };
  
  export default Input;