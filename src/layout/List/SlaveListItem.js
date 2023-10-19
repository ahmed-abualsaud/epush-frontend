import Checkbox from "../Shared/Checkbox"

const SlaveListItem = ({ onSelectItem, children }) => {

    const itemOnClickHandler = (e) => {
        e.currentTarget.classList.toggle("slave-list-item-checked")
        const checkbox = e.currentTarget.querySelector('input[type="checkbox"]')
        checkbox.checked = checkbox.checked ? false : true
        onSelectItem && onSelectItem(checkbox.checked, e.currentTarget)
    }

    return (
        <div className="slave-list-item" onClick={itemOnClickHandler}>
            <Checkbox inactive={true}/>
            { children }
        </div>
    )
}

export default SlaveListItem