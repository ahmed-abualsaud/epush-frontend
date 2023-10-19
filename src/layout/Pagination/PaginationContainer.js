import { isEmpty } from "../../utils/helper"

const PaginationContainer = ({ children }) => {

    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mx-1">
                { children.map(child => ! isEmpty(child.type.name) && child.type.name !== "PaginationInfo" ? child : null) }
            </div>
            { children.map(child => isEmpty(child.type.name) || child.type.name === "PaginationInfo" ? child : null) }
        </div>
    )
}

export default PaginationContainer