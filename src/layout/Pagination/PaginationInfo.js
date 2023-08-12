const PaginationInfo = ({ total, perPage }) => {

    return (
        <div className="d-flex align-items-center justify-content-evenly m-5">
            <div>total rows = {total}</div>
            <div>number of pages = {Math.ceil(parseFloat(total/perPage))}</div>
            <div>rows per page = {perPage}</div>
        </div>
    )
}

export default PaginationInfo