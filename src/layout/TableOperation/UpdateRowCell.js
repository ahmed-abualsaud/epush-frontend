import { isEmpty } from "../../utils/helper"

const UpdateRowCell = ({ updateFunction, ...props }) => {

    return (
        <td
            style={{padding: "0"}}
            key="edit" 
            onClick={updateFunction} 
            className="operation"
        >
            <a className="modal-button" href={ ! isEmpty(props) && props[0]?.popup ? "#popup" : "#"}><i className="uil uil-edit-alt"></i></a>
        </td>
    )
}

export default UpdateRowCell