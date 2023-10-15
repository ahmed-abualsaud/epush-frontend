import "../../assets/style/layout/hint.css"
import { getElement } from "../../utils/dom"
import { randomString } from "../../utils/helper"

const Hint = ({ children }) => {
    const hintKey = "hint-" + randomString(8)
    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    const removeHint = () => {
        let hint = getElement(hintKey)
        hint.parentNode.removeChild(hint)
    }

    return (
        <div id={hintKey} className="hint-container">
            <div className="close-hint" onClick={removeHint}>X</div>
            {children.map((child, index) => 
                <div key={"hint" + index} className="hint">
                    {child}
                </div>
            )}
        </div>
    )
}

export default Hint