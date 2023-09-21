import "../../assets/style/layout/items-list.css"
import { isEmpty } from "../../utils/helper"

const ItemsList = ({ items }) => {

    return (
        <div className="items-list">
            {isEmpty(items) ? <div className="items-list-item">The list does't have any items yet</div>: 
            items.map(item => 
                <div className="items-list-item"><pre>{item}</pre></div>
            )}
            <div className="items-list-total">Total= {items.length}</div>
        </div>
    )
}

export default ItemsList