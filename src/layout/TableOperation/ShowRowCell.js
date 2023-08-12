import { isEmpty } from "../../utils/helper"

const ShowRowCell = ({ showFunction, ...props}) => {

    return (
        <td
            style={{padding: "0"}}
            onClick={showFunction}
            key="show" 
            className="operation"
        >
            <a className="modal-button" href={ ! isEmpty(props) && props[0]?.popup ? "#popup" : "#"}><i className="uil uil-eye"></i></a>
        </td>
    )
}

export default ShowRowCell