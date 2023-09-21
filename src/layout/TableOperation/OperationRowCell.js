const OperationRowCell = ({ operationFunction, ...props }) => {

    return (
        <td
            style={{padding: "0"}}
            key="edit" 
            onClick={operationFunction} 
            className="operation"
        >
            <a className="modal-button" href="#">
                { props[0].children }
            </a>
        </td>
    )
}

export default OperationRowCell