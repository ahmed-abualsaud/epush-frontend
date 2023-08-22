import '../assets/style/page/not-found.css'

const NotFound = ({ route }) => {

    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <h1>Not Found</h1>
                <br></br>
                <h3>404</h3>
                <h6>route {route} not found</h6>
            </div>
        </div>
    )
}

export default NotFound