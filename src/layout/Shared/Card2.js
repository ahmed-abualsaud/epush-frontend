import '../../assets/style/layout/card2.css'

const Card2 = ({ children }) => {

    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    return (
        <div className="card2-container">
            <div className="card2-spinner"></div>
            <div className="card2">
                {children}
            </div>
        </div>
    )
}

export default Card2