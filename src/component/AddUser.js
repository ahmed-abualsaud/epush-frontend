import '../assets/style/component/add-user.css'

import RoleList from './RoleList'
import Input from '../layout/Input'
import { isEmpty } from '../utils/helper'
import useAuthApi from '../api/useAuthApi'
import PermissionList from './PermissionList'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../utils/validator'
import { getElement, getFormInputData } from '../utils/dom'


const AddUser = () => {

    const { addUser } = useAuthApi()
    const [currentUser, setCurrentUser] = useState([])
    const [imagePreview, setImagePreview] = useState("https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg");

    const setupLock = useRef(true)
    const setup = async () => {
        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("add-avatar-input").click())
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewUser = async () => {
        if (validate("add-user-form")) {
            const newUser = getFormInputData("add-user-form")
            let user = new FormData();
            Object.keys(newUser).forEach(key => ! isEmpty(newUser[key]) && user.append(key.split("-")[2], newUser[key]))
            let avatar = getElement("add-avatar-input").files[0]
            if (! isEmpty(avatar)) { user.append("avatar", avatar) }
            user.append("enabled", getElement("add-user-enabled").checked)
            user = await addUser(user);
            if (! isEmpty(user)) {
                showAlert("User Added Successfully please scroll to bottom!")
                setCurrentUser(user)
            } else {
                showAlert("Valid User Information Required")
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
            <h1 className="add-user-header">Add New User</h1>

            <div className="user-image">
                <div className="avatar-hint">Click on the image to select the user profile avatar!</div>
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

            <Input id="add-user-phone" type="tel" placeholder="Phone Number" validrules="required|phone">
                <i className="input-icon uil uil-phone"></i>
            </Input>

            <Input id="add-user-religion" type="text" placeholder="Religion" validrules="required">
                <i className="input-icon uil uil-flower"></i>
            </Input>

            <Input id="add-user-notes" type="text" placeholder="Notes" validrules="">
                <i className="input-icon uil uil-notes"></i>
            </Input>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Disabled</span><span>Enabled</span></h6>
                <input id="add-user-enabled" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-user-enabled"></label>
            </div>

            <div className="update-user">
                <button className="button" onClick={() => addNewUser()}>Add New User</button>
            </div>
            <RoleList userID={currentUser["id"]}/>
            <PermissionList entity="User" entityID={currentUser["id"]}/>
        </div>
    )
}

export default AddUser