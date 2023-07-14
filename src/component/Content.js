import '../assets/style/component/content.css'

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