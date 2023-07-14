import '../assets/style/layout/footer.css'

const Footer = ({ children }) => {

    return (
      <footer className="footer text-white py-3">
        <p className="text-center mb-0">© 2023 All rights reserved.</p>
          { children }
      </footer>
    );
  };
  
  export default Footer;