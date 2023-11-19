import { isEmpty } from "../../utils/helper"

const OperationRowCell = ({ operationFunction, ...props }) => {

    return (
        <td
            style={{padding: "0"}}
            key="edit" 
            onClick={operationFunction} 
            className="operation"
        >
            <a className="modal-button" href={ ! isEmpty(props) && props[0]?.popup ? "#popup" : "#"}>
                { props[0].children }
            </a>
        </td>
    )
}

export default OperationRowCell