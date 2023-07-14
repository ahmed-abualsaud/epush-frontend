import '../assets/style/layout/form.css'

const Form = ({ id, className, children }) => {

    return (
        <div id={id} className={`form-card ${className}`}>
            <div className="center-wrap">
                <div className="section text-center">
                { children }
                </div>
            </div>
        </div>
    );
  };
  
  export default Form;