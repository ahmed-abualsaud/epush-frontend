import { useSelector } from 'react-redux'
import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from '../../utils/helper'
import Card2 from '../../layout/Shared/Card2'
import Avatar from '../../layout/Shared/Avatar'
import { showAlert } from '../../utils/validator'
import Table from '../../layout/Table/Table'
import TableHead from '../../layout/Table/TableHead'
import HeadRow from '../../layout/Table/HeadRow'
import HeadCells from '../../layout/Table/HeadCells'
import TableBody from '../../layout/Table/TableBody'
import DataRows from '../../layout/Table/DataRows'
import useSearchApi from '../../api/useSearchApi'
import Section from '../../layout/Shared/Section'
import Input from '../../layout/Shared/Input'
import useAuthApi from '../../api/useAuthApi'
import { getElement } from '../../utils/dom'
import Page from '../../page/Page'

const ClientProfile = () => {

    const user = useSelector(state => state.auth.user)

    const [client, setClient] = useState([])
    const [orders, setOrders] = useState([])
    const [avatar, setAvatar] = useState({})

    const ordersColumns = ["credit", "sales_name", "pricelist", "payment_method", "collection_date", "created_at"]

    const { search } = useSearchApi()
    const { updateUser } = useAuthApi()
    const {getClient, updateClient, getClientLatestOrder} = useCoreApi()

    const setupLock = useRef(true)
    const setup = async () => {
        if (! isEmpty(user?.user?.id)) {
            let clt = await getClient(user?.user?.id)
            if (! clt) return
            clt.lastOrder = await getClientLatestOrder(user?.user?.id)
            setClient(clt)

            let ord = await search("order", "user_id = " + user?.user?.id)
            if (ord) setOrders(ord)
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        setClient(user)
    }, [user]);

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }

    const updateUserAttribute = async (attributeName, attributeValue, onSuccess = null) => {
        if (! isEmpty(attributeValue)) {
            let data = new FormData()
            data.append(attributeName, attributeValue)
            data = await updateClient(user?.user?.id, data)

            if (! isEmpty(data)) {
                setup()
                showAlert(`Client ${snakeToBeautifulCase(attributeName)} Updated Successfully`)
                onSuccess && onSuccess(data)
            }
        } else {
            showAlert(`Please Enter ${snakeToBeautifulCase(attributeName)} First`)
        }
    }

    const changePassword = async () => {

        let input = new FormData()
        input.append("password", getElement("password")?.value)
        input.append("password_confirmation", getElement("password-confirmation")?.value)

        if (isEmpty(input.get("password"))) {
            showAlert("Password is Required")
            return
        }

        if (isEmpty(input.get("password_confirmation"))) {
            showAlert("Password Confirmation is Required")
            return
        }

        const result = await updateUser(user?.user?.id, input);
        if (! isEmpty(result)) {
            showAlert("Password Changed Successfully!")
        }
    }

    return (
        <Page title="Profile Information">
            <div className="m-5">
                <Card2>
                    <div>Balance: {client.balance} LE</div>
                    <div>Number of Messages: {client.lastOrder?.pricelist? Math.floor(client.balance / client.lastOrder.pricelist.price) : 0}</div>
                </Card2>
            </div>

            <Avatar imageUrl={user?.user?.avatar} onSelectAvatar={onSelectAvatar}/>
            <div className="w-100 d-flex justify-content-center">
                <button className="button" onClick={() => updateUserAttribute("avatar", avatar)}>Update Avatar</button>
            </div>

            <Section title="Change Password" contentPadding="0 0 20px 0">
                <div style={{color: "red", margin: "20px"}}>Note: The minimum password length is 8 characters and must contain numbers, lowercase letters, uppercase letters, and at least one special character.</div>
                <Input id="password" icon="fas fa-lock" type="password" placeholder="Password"/>
                <Input id="password-confirmation" icon="fas fa-lock" type="password" placeholder="Password Confirmation"/>
                <div className="w-100 d-flex justify-content-center">
                    <button className="button" onClick={() => changePassword()}>Change Password</button>
                </div>
            </Section>

            <Section title="Client Orders">
                {isEmpty(orders) ? <div className="no-data"> Client has no Orders! </div> :
                <Table>
                    <TableHead>
                        <HeadRow>
                            <HeadCells columns={ordersColumns}/>
                        </HeadRow>
                    </TableHead>
                    <TableBody>
                        <DataRows columns={ordersColumns} rows={orders.map(order => {
                            order.pricelist = order.pricelist_name
                            order.payment_method = order.payment_method_name
                            return order
                        })}/>
                    </TableBody>
                </Table>}
            </Section>
        </Page>
    )
}

export default ClientProfile