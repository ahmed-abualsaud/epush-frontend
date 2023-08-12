const withOperationCellParameters = (Component, functionName, targetFunction, ...props) => {

    if (functionName === "deleteFunction") {
        return (row, deletedRows, setDeletedRows) => (
            <Component {...{ [functionName]: () => targetFunction(row, deletedRows, setDeletedRows) }} {...props} />
        )
    }

    return (row) => (
        <Component {...{ [functionName]: () => targetFunction(row) }} {...props} />
    )
}
  
export default withOperationCellParameters