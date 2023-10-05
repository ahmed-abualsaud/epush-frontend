import '../../assets/style/component/add-user.css'

import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import { navigate } from '../../setup/navigator'
import DropList from '../../layout/Shared/DropList'
import useCoreApi from '../../api/useCoreApi'
import useExpenseApi from '../../api/useExpenseApi'


const AddOrder = () => {

    const { listClients, listPricelists, getClientOrders } = useCoreApi()
    const { addOrder, listPaymentMethods} = useExpenseApi()

    const [client, setClient] = useState([])
    const [pricelist, setPricelist] = useState([])
    const [paymentMethod, setPaymentMethod] = useState([])
    const [lastPricelists, setLastPricelists] = useState("Not Found")

    const [selectedUserID, setSelectedUserID] = useState(0)
    const [selectedActionID, setSelectedActionID] = useState(null)
    const [selectedPricelistID, setSelectedPricelistID] = useState(0)
    const [selectedPaymentMethodID, setSelectedPaymentMethodID] = useState(0)

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000)
        if (clt?.data) setClient(clt.data)

        const prclst = await listPricelists()
        if (prclst) setPricelist(prclst)

        const pymtod = await listPaymentMethods()
        if (pymtod) setPaymentMethod(pymtod)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    const addNewOrder = async () => {

        if (validate("add-order-form")) {

            let newOrder = {}
            newOrder.credit = getElement("add-order-credit").value
            newOrder.user_id = selectedUserID
            newOrder.action = selectedActionID
            newOrder.pricelist_id = selectedPricelistID
            newOrder.payment_method_id = selectedPaymentMethodID

            newOrder = await addOrder(newOrder);
            if (! isEmpty(newOrder)) {
                navigate("content", "list-orders")
                showAlert("Order Added Successfully!")
            } else {
                showAlert("Valid Order Information Required")
            }
        }
    }

    const onSelectClient = async (option) => {
        const selected_user_id = client.find(c => c.company_name === option).user_id
        setSelectedUserID(selected_user_id)
        const clientOrders = await getClientOrders(selected_user_id)
        const lastOrder = clientOrders[clientOrders.length - 1]
        lastOrder ? setLastPricelists(pricelist.find(pl => pl.id === lastOrder?.pricelist_id)?.price) : setLastPricelists("Not Found")
    }

    const onSelectAction = (option) => {
        setSelectedActionID(option)
    }

    const onSelectPricelist = (option) => {
        setSelectedPricelistID(pricelist.find(bf => bf.name === option).id)
    }

    const onSelectPaymentMethod = (option) => {
        setSelectedPaymentMethodID(paymentMethod.find(pm => pm.name === option).id)
    }



    return (
        <div id="add-order-form" className="add-user-container">
            <h1 className="add-user-header">Add New Order</h1>

            <div style={{fontSize: "30px"}} className="d-flex justify-content-around m-5">
                <div>
                    <i className="uil uil-dollar-alt"></i>
                    <span>Balance = {client.find(c => c.user_id === selectedUserID)?.balance ?? 0.00}</span>
                </div>
                <div>
                    <i className="uil uil-dollar-alt"></i>
                    <span>Last Pricelist = {lastPricelists}</span>
                </div>
            </div>

            <Input style={{height: "80px", fontSize: "25px"}} id="add-order-credit" type="number" placeholder="Credit" validrules="required">
                <i style={{fontSize: "40px", marginTop: "15px", marginLeft: "-10px"}} className="input-icon uil uil-dollar-alt"></i>
            </Input>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Company Name</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Company Name" options={client.map(item => item.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Pricelist</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Pricelist" options={pricelist.map(item => item.name)} onSelect={onSelectPricelist}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Payment Method</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Payment Method" options={paymentMethod.map(item => item.name)} onSelect={onSelectPaymentMethod}/>
                </div>
            </div>

            <div>
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Action</div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "85%"}}>
                    <DropList selectName="Select Action" options={["Add", "Refund", "Deduct"]} onSelect={onSelectAction}/>
                </div>
            </div>

            <div className="update-user">
                <button className="button" onClick={() => addNewOrder()}>Add New Order</button>
            </div>

        </div>
    )
}

export default AddOrder