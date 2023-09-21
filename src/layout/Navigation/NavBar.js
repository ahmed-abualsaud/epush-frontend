import { useEffect, useRef } from "react"
import "../../assets/style/layout/navbar.css"
import { getFirstElementParent } from "../../utils/dom"

const NavBar = ({ children }) => {

    children = children ? children.length === 1 ? [children] : children : []

    const setupLock = useRef(true)
    const setup = async () => {
        let tabsNewAnim = document.querySelector("#navbar-animmenu")
        let activeItemNewAnim = tabsNewAnim.querySelector(".active")
        let activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth
        let itemPosNewAnimLeft = activeItemNewAnim.offsetLeft
        document.querySelector(".hori-selector").style.left = itemPosNewAnimLeft + "px"
        document.querySelector(".hori-selector").style.width = activeWidthNewAnimWidth + "px"
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onClickHandler = (e) => {
        let navItems = document.querySelectorAll("#navbar-animmenu ul li")
        navItems.forEach(function(item) {
            item.classList.remove("active")
        })

        let parent = getFirstElementParent("li", e.target)
        parent?.classList.add("active")

        let activeWidthNewAnimWidth = parent?.offsetWidth
        let itemPosNewAnimLeft = parent?.offsetLeft
        document.querySelector(".hori-selector").style.left = itemPosNewAnimLeft + "px"
        document.querySelector(".hori-selector").style.width = activeWidthNewAnimWidth + "px"
    }

    return (
        <div id="navbar-animmenu">
            <ul>
                <div className="hori-selector">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>

                {children.map((child, index) => 
                    <li className={index === 0 ? "active" : ""} onClick={onClickHandler}>
                        <a href="javascript:void(0);">
                            {child}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default NavBar