import Input from '../../layout/Shared/Input'
import { isEmpty } from '../../utils/helper'
import { useState } from 'react'
import { showAlert, validate } from '../../utils/validator'
import { getElement, getFormInputData } from '../../utils/dom'
import useCoreApi from '../../api/useCoreApi'
import { navigate } from '../../setup/navigator'
import Avatar from '../../layout/Shared/Avatar'
import Page from '../../page/Page'


const AddAdmin = () => {

    const { addAdmin } = useCoreApi()
    const [avatar, setAvatar] = useState({})

    const addNewAdmin = async () => {

        if (validate("add-user-form")) {
            const newUser = getFormInputData("add-user-form")
            let user = new FormData();
            Object.keys(newUser).forEach(key => ! isEmpty(newUser[key]) && user.append(key.split("-")[2], newUser[key]))

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

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }



    return (
        <Page id="add-user-form" title="Add New Admin">
            <Avatar onSelectAvatar={onSelectAvatar}/>

            <Input id="add-user-first_name" icon="uil uil-user" type="text" placeholder="First Name" validrules="required"/>
            <Input id="add-user-last_name" icon="uil-users-alt" type="text" placeholder="Last Name" validrules="required"/>
            <Input id="add-user-username" icon="uil uil-user-check" type="text" placeholder="Username" validrules="required"/>
            <Input id="add-user-email" icon="uil uil-at" type="email" placeholder="Email" validrules="required"/>
            <Input id="add-user-phone" icon="uil uil-phone" type="tel" placeholder="Phone" validrules="required|phone"/>
            <Input id="add-client-address" icon="uil uil-map-marker" type="text" placeholder="Address" validrules="required"/>
            <Input id="add-user-password" icon="uil uil-lock-alt" type="password" placeholder="Password" validrules="required|strong_password"/>
            <Input id="add-user-password_confirmation" icon="uil uil-lock" type="password" placeholder="Password Confirmation" validrules="required"/>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Disabled</span><span>Enabled</span></h6>
                <input id="add-user-enabled" className="checkbox d-none" type="checkbox" defaultChecked={true}/>
                <label for="add-user-enabled"></label>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewAdmin()}>Add New Admin</button>
            </div>
        </Page>
    )
}

export default AddAdmin