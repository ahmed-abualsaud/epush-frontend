import "../../assets/style/layout/section.css"

const Section = ({ id, title, renderTitle, className, children, contentPadding }) => {

    return (
        <section id={id} className={`section-container ${className}`}>
            {renderTitle ? <div className="section-title">{renderTitle()}</div> : title && <div className="section-title">{title}</div>}
            <div style={{padding: contentPadding}} className="section-content">
                {children}
            </div>
        </section>
    )
}

export default Section