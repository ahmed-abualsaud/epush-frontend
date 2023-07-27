import '../assets/style/component/show-modal.css'
import { isEmpty } from '../utils/helper'

const ShowModal = ({ entity, data, columns }) => {

    return (
        <div className="show-modal-wrapper">
            {entity === "User" && <div className="w-50 show-modal-avatar">
                <img src={entity === "User" && ! isEmpty(data["avatar"])? data["avatar"] : "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
            </div>}
            <div className={"show-modal-info-wrapper " + (entity === "User"? "w-50": "w-100")}>
                {columns.map((col) => (
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">{col}: </span>
                        <span key={ "show-" + col }>{ typeof data[col] === 'boolean' ? data[col] ? "Yes": "No" : data[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowModal