import "../assets/style/layout/page.css"

const Page = ({ id, title, renderTitle, className, style, children }) => {

    return (
        <div id={id} className={`page-container ${className}`} style={style}>
            {renderTitle ? <div className="page-title">{renderTitle()}</div> : title && <div className="page-title">{title}</div>}
            <div className="page-content">
                {children}
            </div>
        </div>
    )
}

export default Page