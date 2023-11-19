import RoleList from '../Role/RoleList'
import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import useAuthApi from '../../api/useAuthApi'
import PermissionList from '../Permission/PermissionList'
import { useEffect, useRef, useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import { navigate } from '../../setup/navigator'
import Avatar from '../../layout/Shared/Avatar'
import Page from '../../page/Page'


const AddUser = () => {

    const { addUser } = useAuthApi()
    const [avatar, setAvatar] = useState({})
    const [currentUser, setCurrentUser] = useState([])

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

            if (! isEmpty(avatar)) { user.append("avatar", avatar) }
            user.append("enabled", getElement("add-user-enabled").checked)

            user = await addUser(user);
            if (! isEmpty(user)) {
                setCurrentUser(user)
                navigate("content", "list-users")
                showAlert("User Added Successfully please scroll to bottom!")
            } else {
                showAlert("Valid User Information Required")
            }
        }
    }

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }



    return (
        <Page id="add-user-form" title="Add New User">
            <Avatar onSelectAvatar={onSelectAvatar}/>

            <Input id="add-user-first_name" type="text" icon="uil uil-user" placeholder="First Name" validrules="required"/>
            <Input id="add-user-last_name" type="text" icon="uil uil-users-alt" placeholder="Last Name" validrules="required"/>
            <Input id="add-user-username" type="text" icon="uil uil-user-check" placeholder="Username" validrules="required"/>
            <Input id="add-user-email" type="email" icon="uil uil-at" placeholder="Email" validrules="required"/>
            <Input id="add-user-phone" type="tel" icon="uil uil-phone" placeholder="Phone" validrules="required|phone"/>
            <Input id="add-client-address" type="text" icon="uil uil-map-marker" placeholder="Address" validrules="required"/>
            <Input id="add-user-password" type="password" icon="uil uil-lock-alt" placeholder="Password" validrules="required|strong_password"/>
            <Input id="add-user-password_confirmation" type="password" icon="uil uil-lock" placeholder="Password Confirmation" validrules="required"/>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Disabled</span><span>Enabled</span></h6>
                <input id="add-user-enabled" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-user-enabled"></label>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewUser()}>Add New User</button>
            </div>
            <RoleList userID={currentUser["id"]}/>
            <PermissionList entity="User" entityID={currentUser["id"]}/>
        </Page>
    )
}

export default AddUser