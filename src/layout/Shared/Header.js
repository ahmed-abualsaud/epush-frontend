import '../../assets/style/layout/header.css'
import '../../component/Header/Logo'

const Header = ({ children }) => {

  return (
    <nav className="navbar header">
      { children }
    </nav>
  );
};

export default Header;