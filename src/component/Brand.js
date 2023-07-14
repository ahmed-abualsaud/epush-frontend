import '../assets/style/component/brand.css'
import Logo from '../component/Logo';

const Brand = () => {
    return (
        <a className="nav-brand text-decoration-none text-white" href="/">
            <Logo />
            <h1 className="display-5 d-inline">e-push</h1>
        </a>
    )
}

export default Brand