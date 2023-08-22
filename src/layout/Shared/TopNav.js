import { useState } from 'react'
import '../../assets/style/layout/top-nav.css'
import { navigate } from '../../setup/navigator'

const TopNav = ({ tab }) => {

    const [previous, setPrevious] = useState(-1)

    const tabOnClickHandler = (e, table) => {
        e.target.classList.add('initialised')
        const index = e.target.getAttribute('data-index')
        const navtab = e.target.closest('nav.tab')
        navtab.classList.add('moving')
        navtab.setAttribute('data-selected', index)
        if (previous === -1) {
            navtab.querySelector('.icon[data-index="2"]').classList.add('initialised')
        }
        if ((previous === 1 && index === 3) || (previous === 3 && index === 1)) {
            navtab.querySelector('.icon[data-index="2"]').classList.remove('initialised')
            setTimeout(function() {
                navtab.querySelector('.icon[data-index="2"]').classList.add('initialised')
            })
        }
        setPrevious(index)
        setTimeout(function() {
            navtab.classList.remove('moving')
            navtab.classList.remove('hidemiddle')
        }, 750)

        navigate("content", table === "all" ? "list-users": table === "clients" ? "list-clients" : "list-admins")
    }

    return (
        <div className="topnav-container">
            <nav class="tab" data-selected={tab === "admins" ? "1" : tab === "all" ? "2" : "3"}>
                <div class="icons">
                    <div data-index="1" class="icon" onClick={(e) => tabOnClickHandler(e, "admins")}>Admins</div>
                    <div data-index="2" class="icon" onClick={(e) => tabOnClickHandler(e, "all")}>All</div>
                    <div data-index="3" class="icon" onClick={(e) => tabOnClickHandler(e, "clients")}>Clients</div>
                </div>
                <div class="bar">
                    <div class="cap"></div>
                    <div class="middle">
                        <div class="side"></div>
                        <div class="circle"></div>
                        <div class="side"></div>
                    </div>
                    <div class="cap"></div>
                </div>
            </nav>
        </div>
    )
}

export default TopNav