import '../assets/style/layout/header.css'
import '../component/Logo'

const Header = ({ children }) => {

  return (
    <nav className="navbar header">
      { children }
    </nav>
  );
};

export default Header;