import '../../assets/style/component/add-user.css'

import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import useCoreApi from '../../api/useCoreApi'
import { navigate } from '../../setup/navigator'


const AddAdmin = () => {

    const { addAdmin } = useCoreApi()
    const [imagePreview, setImagePreview] = useState("https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg");

    const setupLock = useRef(true)
    const setup = async () => {
        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("add-avatar-input").click())
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewAdmin = async () => {

        if (validate("add-user-form")) {
            const newUser = getFormInputData("add-user-form")
            let user = new FormData();
            Object.keys(newUser).forEach(key => ! isEmpty(newUser[key]) && user.append(key.split("-")[2], newUser[key]))

            let avatar = getElement("add-avatar-input").files[0]
            if (! isEmpty(avatar)) { user.append("avatar", avatar) }
            user.append("enabled", getElement("add-user-enabled").checked)

            user = await addAdmin(user);
            if (! isEmpty(user)) {
                navigate("content", "list-admins")
                showAlert("Admin Added Successfully")
            } else {
                showAlert("Valid Admin Information Required")
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



    return (
        <div id="add-user-form" className="add-user-container">
            <h1 className="add-user-header">Add New Admin</h1>

            <div className="user-image">
                <div className="avatar-hint">Click on the image to select the admin profile avatar!</div>
                <div className="image-wrapper">
                    <img src={imagePreview} alt="Avatar" />
                    <input id="add-avatar-input" type="file" accept="image/*" onChange={handleImageChange}/>
                    <i className="uil uil-camera-plus"></i>
                </div>
            </div>

            <Input id="add-user-first_name" type="text" placeholder="First Name" validrules="required">
                <i className="input-icon uil uil-user"></i>
            </Input>

            <Input id="add-user-last_name" type="text" placeholder="Last Name" validrules="required">
                <i className="input-icon uil uil-users-alt"></i>
            </Input>

            <Input id="add-user-username" type="text" placeholder="Username" validrules="required">
                <i className="input-icon uil uil-user-check"></i>
            </Input>

            <Input id="add-user-email" type="email" placeholder="Email" validrules="required">
                <i className="input-icon uil uil-at"></i>
            </Input>

            <Input id="add-user-phone" type="tel" placeholder="Phone" validrules="required|phone">
                <i className="input-icon uil uil-phone"></i>
            </Input>

            <Input id="add-client-address" type="text" placeholder="Address" validrules="required">
                <i className="input-icon uil uil-map-marker"></i>
            </Input>

            <Input id="add-user-password" type="password" placeholder="Password" validrules="required|strong_password">
                <i className="input-icon uil uil-lock-alt"></i>
            </Input>

            <Input id="add-user-password_confirmation" type="password" placeholder="Password Confirmation" validrules="required">
                <i className="input-icon uil uil-lock"></i>
            </Input>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Disabled</span><span>Enabled</span></h6>
                <input id="add-user-enabled" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-user-enabled"></label>
            </div>

            <div className="update-user">
                <button className="button" onClick={() => addNewAdmin()}>Add New Admin</button>
            </div>
        </div>
    )
}

export default AddAdmin