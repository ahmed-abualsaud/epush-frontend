import { isEmpty } from "../utils/helper"

const withOperationCellParameters = (Component, functionName, targetFunction, ...props) => {

    if (isEmpty(functionName) && isEmpty(targetFunction)) {
        return () => (
            <Component {...props} />
        )
    }

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