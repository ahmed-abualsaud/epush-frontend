import '../../assets/style/layout/content.css'

const Content = ({ children }) => {
    return (
        <main id="content" className="content content-collapse">
            <div>
                { children }
            </div>
        </main>
    )
}

export default Content