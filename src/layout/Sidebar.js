import React from 'react'
import '../assets/style/layout/sidebar.css'
import Logo from '../component/Logo'
import NavItems from './NavItems'
import NavToggler from '../component/NavToggler'

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
            </nav>
        </aside>
    )
}

export default Sidebar
