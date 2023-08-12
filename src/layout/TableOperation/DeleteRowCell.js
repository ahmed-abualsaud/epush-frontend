const DeleteRowCell = ({ deleteFunction }) => {

    return (
        <td 
            style={{padding: "0"}} 
            onClick={deleteFunction} 
            key="delete" 
            className="operation"
        >
            <a className="modal-button btn-del" href="#popup"><i className="uil uil-trash-alt"></i></a>
        </td>
    )
}

export default DeleteRowCell