import '../assets/style/layout/sidebar.css'
import React from 'react'
import Button from './Button'
import NavItems from './NavItems'
import Logo from '../component/Logo'
import NavToggler from '../component/NavToggler'
import { navigate, nextRoute, previousRoute } from '../setup/navigator'

const Sidebar = ({ children }) => {

    return (
        <aside id="sidebar" className="sidebar">
            <NavToggler />
            <header onClick={() => navigate("root", "home")}>
                <Logo /> 
                e-push
            </header>
            <nav className="sidebar-nav">
                <NavItems>

                    { children }

                </NavItems>
                <div className="page-nav">
                    <Button className="nav-back-button" onClick={previousRoute}><i className="uil uil-arrow-left"></i></Button>
                    <div className="elipsis">.....</div>
                    <Button className="nav-front-button" onClick={nextRoute}><i className="uil uil-arrow-right"></i></Button>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
