import '../assets/style/layout/nav-items.css'

const NavItems = ({ className, children }) => {

  return (
    <ul className={`nav-items ${className}`}>
      { children }
    </ul>
  );
}

export default NavItems
