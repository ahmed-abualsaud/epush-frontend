import React, { useLayoutEffect, useRef } from "react"
import "../../assets/style/layout/navbar.css"
import { getFirstElementParent } from "../../utils/dom"
import { randomString } from "../../utils/strUtils"

const NavBar = ({ children }) => {
    const navbarKey = randomString(8)
    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    const horiSelectorRef = useRef(null)

    useLayoutEffect(() => {
        const active = horiSelectorRef.current.parentElement.querySelector('.active')
        horiSelectorRef.current.style.left = active?.offsetLeft + "px"
        horiSelectorRef.current.style.width = active?.offsetWidth + "px"
    }, [horiSelectorRef.current])


    const onClickHandler = (e) => {
        let navItems = document.querySelectorAll("#navbar-animmenu-" + navbarKey + " ul li")
        navItems.forEach(function (item) {
        item.classList.remove("active")
        })

        let parent = getFirstElementParent("li", e.target)
        parent?.classList.add("active")
        horiSelectorRef.current.style.left = parent?.offsetLeft + "px"
        horiSelectorRef.current.style.width = parent?.offsetWidth + "px"
    }

    return (
        <div id={"navbar-animmenu-" + navbarKey} className="navbar-animmenu">
        <ul>
            <div id={"hori-selector-" + navbarKey} className="hori-selector" ref={horiSelectorRef}>
            <div className="left"></div>
            <div className="right"></div>
            </div>

            {children.map((child, index) => (
            <li className={index === 0 ? "active" : ""} onClick={onClickHandler}>
                <a href="javascript:void(0);">{child}</a>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default NavBar