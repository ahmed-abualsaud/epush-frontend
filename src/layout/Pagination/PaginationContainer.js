const PaginationContainer = ({ children }) => {

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mx-1">
                { children.map(child => child.type.name !== "PaginationInfo" ? child : null) }
            </div>
            { children.map(child => child.type.name === "PaginationInfo" ? child : null) }
        </>
    )
}

export default PaginationContainer