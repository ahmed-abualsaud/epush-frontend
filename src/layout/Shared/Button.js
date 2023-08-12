import '../../assets/style/layout/button.css'

const Button = ({ className, onClick, children }) => {

    return (
      <button className={ className?? 'button' } onClick={onClick}>
        { children } 
      </button>
    );
  };
  
  export default Button;