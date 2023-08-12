import { showAlert } from "../../utils/validator"
import useExpenseApi from "../../api/useExpenseApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"


const EditPaymentMethod = ({ paymentMethod }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(paymentMethod).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updatePaymentMethod } = useExpenseApi()
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentPaymentMethod(paymentMethod)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificPaymentMethod = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-payment-method-input, "
        })

        let paymentMethodInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        paymentMethodInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new payment method information")

        if (! isEmpty(data)) {
            let newPaymentMethod = await updatePaymentMethod(paymentMethod.id, data)
            if (! isEmpty(newPaymentMethod)) {
                setCurrentPaymentMethod(newPaymentMethod)
                showAlert("Payment Method information updated successfully");
            }
        }
    }



    return (
        <div className="add-user-container">
            <h1 className="add-user-header mb-5">Payment Method Information</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                    <th>Attribute Name</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns?.map((column) => (
                        <tr>
                            <td>{ column }</td>
                            <td>{ typeof currentPaymentMethod[column] === "boolean"? currentPaymentMethod[column] ? "Yes" : "No" : currentPaymentMethod[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-payment-method-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="update-role">
                <button className="button" onClick={() => updateSpecificPaymentMethod()}>Update Payment Method</button>
            </div>
        </div>
    )
}

export default EditPaymentMethod