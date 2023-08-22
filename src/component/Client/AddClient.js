import '../../assets/style/component/add-user.css'

import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import { navigate } from '../../setup/navigator'
import DropList from '../../layout/Shared/DropList'
import useCoreApi from '../../api/useCoreApi'


const AddClient = () => {

    const { addClient, listSales, listBusinessFields } = useCoreApi()

    const [sales, setSales] = useState([])
    const [businessField, setBusinessField] = useState([])
    const [selectedSalesID, setSelectedSalesID] = useState([])
    const [selectedBusinessFieldID, setSelectedBusinessFieldID] = useState([])
    const [websiteInputs, setWebsiteInputs] = useState([
        { id: 0, value: '' }
    ]);

    const [imagePreview, setImagePreview] = useState("https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg");

    const setupLock = useRef(true)
    const setup = async () => {
        const prclst = await listSales()
        if (prclst) setSales(prclst)

        const bsnfld = await listBusinessFields()
        if (bsnfld) setBusinessField(bsnfld)

        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("add-client-avatar-input").click())
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])
    
    const handleFocus = (id) => {
        if (id === websiteInputs.length - 1) {
            setWebsiteInputs([...websiteInputs, { id: id + 1, value: '' }]);
        }
    }

    const handleChange = (id, event) => {
        const newWebsiteInputs = [...websiteInputs];
        newWebsiteInputs[id].value = event.target.value;
        setWebsiteInputs(newWebsiteInputs);
    }

    const addNewClient = async () => {

        if (validate("add-client-form")) {

            const newClient = getFormInputData("add-client-form")
            let client = new FormData();
            Object.keys(newClient).forEach(key => ! isEmpty(newClient[key]) && client.append(key.split("-")[2], newClient[key]))

            let avatar = getElement("add-client-avatar-input").files[0]
            if (! isEmpty(avatar)) { client.append("avatar", avatar) }
            client.append("enabled", getElement("add-client-enabled").checked)

            let websites = []
            for (let i = 0; i < websiteInputs.length; i++) {
                websites.push("#website-input-" + i)
            }
            let websitesInputs = document.querySelectorAll(websites.join(", "))
            websites = []

            websitesInputs.forEach((websiteInput) => {
                websiteInput.value && websites.push({url: websiteInput.value})
            })

            client.append("websites", JSON.stringify(websites))
            client.append("sales_id",  selectedSalesID)
            client.append("business_field_id",  selectedBusinessFieldID)

            client = await addClient(client);
            if (! isEmpty(client)) {
                navigate("content", "list-clients")
                showAlert("Client Added Successfully!")
            } else {
                showAlert("Valid Client Information Required")
            }
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const onSelectSales = (option) => {
        setSelectedSalesID(sales.filter(p => p.name === option)[0].id)
    }

    const onSelectBusinessField = (option) => {
        setSelectedBusinessFieldID(businessField.filter(bf => bf.name === option)[0].id)
    }



    return (
        <div id="add-client-form" className="add-user-container">
            <h1 className="add-user-header">Add New Client</h1>

            <div className="user-image">
                <div className="avatar-hint">Click on the image to select the client profile avatar!</div>
                <div className="image-wrapper">
                    <img src={imagePreview} alt="Avatar" />
                    <input id="add-client-avatar-input" type="file" accept="image/*" onChange={handleImageChange}/>
                    <i className="uil uil-camera-plus"></i>
                </div>
            </div>

            <Input id="add-client-first_name" type="text" placeholder="First Name" validrules="required">
                <i className="input-icon uil uil-user"></i>
            </Input>

            <Input id="add-client-last_name" type="text" placeholder="Last Name" validrules="required">
                <i className="input-icon uil uil-users-alt"></i>
            </Input>

            <Input id="add-client-username" type="text" placeholder="Username" validrules="required">
                <i className="input-icon uil uil-user-check"></i>
            </Input>

            <Input id="add-client-email" type="email" placeholder="Email" validrules="required">
                <i className="input-icon uil uil-at"></i>
            </Input>

            <Input id="add-client-phone" type="tel" placeholder="Phone" validrules="required|phone">
                <i className="input-icon uil uil-phone"></i>
            </Input>

            <Input id="add-client-religion" type="text" placeholder="Religion" validrules="required">
                <i className="input-icon uil uil-flower"></i>
            </Input>

            <Input id="add-client-address" type="text" placeholder="Address" validrules="required">
                <i className="input-icon uil uil-map-marker"></i>
            </Input>

            <Input id="add-client-company_name" type="text" placeholder="Company Name" validrules="required">
                <i className="input-icon uil uil-building"></i>
            </Input>

            <Input id="add-client-notes" type="text" placeholder="Notes" validrules="">
                <i className="input-icon uil uil-notes"></i>
            </Input>

            <div>
                {websiteInputs.map(input => (
                    <div key={input.id} className="form-group my-2">
                        <input 
                            id={ "website-input-" + input.id } 
                            type="text" 
                            name="website" 
                            className="form-style" 
                            placeholder="Website" 
                            autoComplete="off" 
                            validrules="" 
                            onFocus={() => handleFocus(input.id)}
                            onChange={(event) => handleChange(input.id, event)}
                            value={input.value}
                        />
                        <i className="input-icon uil uil-globe"></i>
                    </div>
                ))}
            </div>
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

            <div className="update-user">
                <button className="button" onClick={() => addNewClient()}>Add New Client</button>
            </div>

        </div>
    )
}

export default AddClient