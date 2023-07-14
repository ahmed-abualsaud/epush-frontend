import '../assets/style/layout/card.css'

const Card = ({ title, identifier, description, icon }) => {

    return (
        <div className="card-layout">
            <div className="card-imge">
                <div className="card-icon"><i className={icon}></i></div>
                <p className="card-title">{ title }</p>
                <p className="card-unique-id">{ identifier }</p>
            </div>

            <div className="description">{ description }</div>

            <div className="card-button">
                <a href="#">
                    <span className="card-show"><i className="uil uil-eye"></i>Show</span>
                </a>
            </div>
        </div>
    )
}

export default Card