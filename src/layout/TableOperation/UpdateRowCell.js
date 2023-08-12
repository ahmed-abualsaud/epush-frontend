const UpdateRowCell = ({ updateFunction }) => {

    return (
        <td
            style={{padding: "0"}}
            key="edit" 
            onClick={updateFunction} 
            className="operation"
        >
            <a className="modal-button" href="#"><i className="uil uil-edit-alt"></i></a>
        </td>
    )
}

export default UpdateRowCell