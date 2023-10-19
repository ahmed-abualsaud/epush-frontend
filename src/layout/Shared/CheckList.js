import { isEmpty } from "../../utils/helper"
import Checkbox from "./Checkbox"

const CheckList = ({ emptyListMessage, onSelectItem, children }) => {

    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    const itemOnClickHandler = (e) => {
        e.currentTarget.classList.toggle("checklist-item-checked")
        const checkbox = e.currentTarget.querySelector('input[type="checkbox"]')
        checkbox.checked = checkbox.checked ? false : true
        e.currentTarget.setAttribute("selected", checkbox.checked)
        onSelectItem(e.currentTarget)
    }

    return (
        <div className="checklist-container">
            {isEmpty(children) ? <div className="no-data">{emptyListMessage ?? "List has no Items!"}</div> : 
            children.map(child => (
                <div className="checklist-item" onClick={itemOnClickHandler}>
                    <Checkbox/>
                    <div className="checklist-item-text">{child}</div>
                </div>
            ))}
        </div>
    )
}

export default CheckList