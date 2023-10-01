import { useEffect, useState } from "react"
import "../../assets/style/layout/modal-list.css"
import { showAlert } from "../../utils/validator"
import MessagesList from "./MessagesList"

const ModalList = ({ items, setSelectedContents }) => {

    const [contents, setContents] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    const handelOnClick = (e) => {
        e.currentTarget.parentNode.classList.toggle("modal-list-item-active")
        let children = Object.values(e.currentTarget.parentNode.parentNode.children)
        let activeChild = null
        children.forEach(child => {
            if (child.classList.contains("modal-list-item-active")) {
                activeChild = child
            }
        })

        if (activeChild !== null) {
            children.forEach(child => {
                if (! child.classList.contains("modal-list-item-active")) {
                    child.classList.add("d-none")
                }
            })
        } else {
            children.forEach(child => {
                child.classList.remove("d-none")
            })
        }
    }

    const onChangeEventHandler = (e) => {
        let checkbox = e.currentTarget
        let selectedItem = items.find(item => item.name === checkbox.parentNode.parentNode.innerText)

        if (checkbox.checked) {
            showAlert(selectedItem.name + " selected")
            setContents([...new Set([...contents, ...selectedItem.content])])
            setSelectedItems([...selectedItems, selectedItem])
        } else {
            showAlert(selectedItem.name + " unselected")
            setContents(contents.filter(content => ! selectedItem.content.includes(content)))
            setSelectedItems(selectedItems.filter(si => si !== selectedItem))
        }
    }

    useEffect(() => {
        setSelectedContents(contents, selectedItems)
    }, [contents])


    return (
        <div className="modal-list-container">
            {items.map(item => 
                <div className="modal-list-item-container">
                    <div className="modal-list-item" onClick={handelOnClick}>
                        <label className="checkbox-container modal-list-item-arrow">
                            <input type="checkbox" onChange={onChangeEventHandler}/>
                            <div style={{transform: "rotate(-45deg)"}} className="checkmark"></div>
                            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
                                <polygon points="0,0 10,10"></polygon>
                                <polygon points="0,25 10,25"></polygon>
                                <polygon points="0,50 10,40"></polygon>
                                <polygon points="50,0 40,10"></polygon>
                                <polygon points="50,25 40,25"></polygon>
                                <polygon points="50,50 40,40"></polygon>
                            </svg>
                        </label>
                        {item.name}
                    </div>
                    <div className="modal-list-item-modal">
                        <MessagesList messages={item.content} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalList