import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import { navigate } from '../../setup/navigator'
import DropList from '../../layout/Shared/DropList'
import useCoreApi from '../../api/useCoreApi'
import Avatar from '../../layout/Shared/Avatar'
import Page from '../../page/Page'
import ExtendedInput from '../../layout/Shared/ExtendedInput'


const AddClient = () => {

    const { addClient, listSales, listBusinessFields } = useCoreApi()

    const [sales, setSales] = useState([])
    const [avatar, setAvatar] = useState({})
    const [businessField, setBusinessField] = useState([])
    const [selectedSalesID, setSelectedSalesID] = useState([])
    const [selectedBusinessFieldID, setSelectedBusinessFieldID] = useState([])
    const [websiteInputs, setWebsiteInputs] = useState([]);

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listSales()
        if (prclst) setSales(prclst)

        const bsnfld = await listBusinessFields()
        if (bsnfld) setBusinessField(bsnfld)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewClient = async () => {

        if (validate("add-client-form")) {

            const newClient = getFormInputData("add-client-form")
            let client = new FormData();
            Object.keys(newClient).forEach(key => ! isEmpty(newClient[key]) && client.append(key.split("-")[2], newClient[key]))

            if (! isEmpty(avatar)) { client.append("avatar", avatar) }
            client.append("enabled", getElement("add-client-enabled").checked)
            client.append("websites", JSON.stringify(websiteInputs.map(website => ({url: website}))))
            client.append("sales_id",  selectedSalesID)
            client.append("business_field_id",  selectedBusinessFieldID)

            client = await addClient(client);
            if (! isEmpty(client)) {
                navigate("content", "top-nav")
                showAlert("Client Added Successfully!")
            } else {
                showAlert("Valid Client Information Required")
            }
        }
    }

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }

    const onSelectSales = (option) => {
        setSelectedSalesID(sales.filter(p => p.name === option)[0].id)
    }

    const onSelectBusinessField = (option) => {
        setSelectedBusinessFieldID(businessField.filter(bf => bf.name === option)[0].id)
    }



    return (
        <Page id="add-client-form" title="Add New Client">
            <Avatar onSelectAvatar={onSelectAvatar}/>

            <Input id="add-client-first_name" icon="uil uil-user" type="text" placeholder="First Name" validrules="required"/>
            <Input id="add-client-last_name" icon="uil-users-alt" type="text" placeholder="Last Name" validrules="required"/>
            <Input id="add-client-username" icon="uil-user-check" type="text" placeholder="Username" validrules="required"/>
            <Input id="add-client-email" icon="uil uil-at" type="email" placeholder="Email" validrules="required"/>
            <Input id="add-client-phone" icon="uil uil-phone" type="tel" placeholder="Phone" validrules="required|phone"/>
            <Input id="add-client-religion" icon="uil uil-flower" type="text" placeholder="Religion" validrules="required"/>
            <Input id="add-client-address" icon="uil uil-map-marker" type="text" placeholder="Address" validrules="required"/>
            <Input id="add-client-company_name" icon="uil uil-building" type="text" placeholder="Company Name" validrules="required"/>
            <Input id="add-client-notes" icon="uil uil-notes" type="text" placeholder="Notes" validrules=""/>
            <ExtendedInput type="text" icon="fas fa-globe" placeholder="Website URL" setUpdatedValues={(websites) => setWebsiteInputs(websites)}/>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Disabled</span><span>Enabled</span></h6>
                <input id="add-client-enabled" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-client-enabled"></label>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <DropList selectName="Select Sales" options={sales.map(item => item.name)} onSelect={onSelectSales}/>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <DropList selectName="Select Business Field" options={businessField.map(item => item.name)} onSelect={onSelectBusinessField}/>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewClient()}>Add New Client</button>
            </div>
        </Page>
    )
}

export default AddClient