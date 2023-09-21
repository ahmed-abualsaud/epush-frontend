const MasterListItem = ({ children }) => {

    const expandSlavesItems = (e) => {
        e.currentTarget.parentNode.classList.toggle("expand-slaves-items")
        e.currentTarget.parentNode.classList.toggle("collapse-slaves-items")
    }

    return (
        <div className="master-list-item-container collapse-slaves-items">
            <div className="master-list-item">
                { children }
            </div>
            <div className="master-item-expand-button" onClick={expandSlavesItems}>
                <i className="fas fa-angle-down"></i>
            </div>
        </div>
    )
}

export default MasterListItem