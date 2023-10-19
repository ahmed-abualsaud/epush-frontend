import { useEffect, useRef, useState } from "react"
import useExpenseApi from "../../api/useExpenseApi"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import DropList from "../../layout/Shared/DropList"
import DateTimeButton from "../../layout/Shared/DateTimeButton"

const EditOrder = ({ order }) => {

    const [paymentMethod, setPaymentMethod] = useState([])
    const [collectionDate, setCollectionDate] = useState("----:--:-- 00:00:00")
    const [selectedPaymentMethodID, setSelectedPaymentMethodID] = useState(0)

    const { updateOrder, listPaymentMethods} = useExpenseApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const pymtod = await listPaymentMethods()
        if (pymtod) setPaymentMethod(pymtod)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSelectPaymentMethod = (option) => {
        const pmID = paymentMethod.find(pm => pm.name === option).id
        setSelectedPaymentMethodID(pmID)
        updateOrderPaymentMethod(pmID)
    }

    const getCollectionDate = (collectionDate) => {
        setCollectionDate(collectionDate)
        updateOrderCollectionDate(collectionDate)
    }

    const getCurrentDate = () => {
        const userDate = new Date()
        const timezoneOffset = userDate.getTimezoneOffset() * 60000
        const localDate = new Date(userDate.getTime() - timezoneOffset)
        const selectedDateTime = localDate.toISOString().replace("T", " ").slice(0, 19)
        setCollectionDate(selectedDateTime)
        updateOrderCollectionDate(selectedDateTime)
    }



    const updateOrderPaymentMethod = async (selectedPaymentMethodID) => {

        let newOrder = await updateOrder(order.id, {
            payment_method_id: selectedPaymentMethodID
        })
        if (! isEmpty(newOrder)) {
            showAlert("Payment Method Changed Successfully!")
        } else {
            showAlert("Faild To Change Payment Method")
        }
    }

    const updateOrderCollectionDate = async (collectionDate) => {

        let newOrder = await updateOrder(order.id, {
            collection_date: collectionDate
        })
        if (! isEmpty(newOrder)) {
            showAlert("Order Collected Successfully!")
        } else {
            showAlert("Failed To Collect The Order")
        }
    }



    return (
        <div id="add-order-form" className="component-container">
            <h1 className="content-header">Edit Order</h1>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "25%", fontSize: "25px"}}>Payment Method</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "50%"}}>
                    <DropList selectName={order.payment_method} options={paymentMethod.map(item => item.name)} onSelect={onSelectPaymentMethod}/>
                </div>
                <div className="d-inline-flex align-items-center ms-4" style={{fontSize: "25px"}}>
                    Value: {paymentMethod.find(pm => pm.id === selectedPaymentMethodID)?.name ?? order.payment_method}
                </div>
            </div>

            <div className="mt-5">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "25px"}}>Collection Date</div>
                <DateTimeButton onClick={getCurrentDate} onSelectDate={getCollectionDate}>
                    Collect Now <i className="fas fa-coins ms-3"></i>
                </DateTimeButton>
                <div className="d-inline-flex align-items-center ms-5" style={{fontSize: "25px"}}>Chosen Collection Date: { collectionDate }</div>
            </div>
        </div>
    )
}

export default EditOrder