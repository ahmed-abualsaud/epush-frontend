const AddRowCell = ({ className, addingFunction }) => {

    return (
        <th style={{padding: "0", borderBottom: "1px solid #063F30"}} colSpan={3} key="add">
            <a href="#" className={`button add-button ${className}`} onClick={addingFunction}><i className="uil uil-plus"></i>Add</a>
        </th>
    )
}

export default AddRowCell