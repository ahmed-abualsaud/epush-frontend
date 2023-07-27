import React from 'react'
import '../assets/style/layout/sidebar.css'
import Logo from '../component/Logo'
import NavItems from './NavItems'
import NavToggler from '../component/NavToggler'
import Button from './Button'

const Sidebar = ({ children }) => {

    return (
        <aside id="sidebar" className="sidebar">
            <NavToggler />
            <header>
                <Logo /> 
                e-push
            </header>
            <nav className="sidebar-nav">
                <NavItems>

                    { children }

                </NavItems>
                <Button className="button nav-back-button"><i className="uil uil-arrow-left"></i>Back</Button>
            </nav>
        </aside>
    )
}

export default Sidebar
