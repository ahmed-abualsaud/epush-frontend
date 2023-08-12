import '../../assets/style/layout/nav-item.css'

const NavItem = ({ icon, text, onClick, onMouseLeave, children }) => {

  return (
    <li className="nav-item" onClick={onClick} onMouseLeave={onMouseLeave}>
        <a href="#">
            <i className={`nav-icon ${icon}`}></i>
            <span>{text}</span>
            {  children != null? <i className="nav-expand uil uil-angle-right"></i> : null }
        </a>
        { children }

    </li>
  );
}

export default NavItem
