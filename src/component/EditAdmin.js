import { getElement } from "../utils/dom"
import useCoreApi from "../api/useCoreApi"
import { showAlert } from "../utils/validator"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../utils/helper"
import { render } from "../setup/navigator"

const EditAdmin = ({ admin }) => {

    const excludedColumns = [
        "id", 
        "full_name", 
        "avatar", 
        "enabled", 
        "created_at", 
        "updated_at", 
        "deleted_at", 
        "email_verified_at"
    ]

    const filteredColumns = Object.keys(admin).filter(
      (column) => !excludedColumns.includes(column)
    )

    const { updateAdmin } = useCoreApi()
    const [currentAdmin, setCurrentAdmin] = useState([])
    const [imagePreview, setImagePreview] = useState(admin["avatar"] ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg")

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentAdmin(admin)
        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("edit-admin-avatar-input").click())
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const enableDisableAdmin = async (checkboxId) => {
        let data = new FormData()
        data.append("enabled", getElement(checkboxId).checked)
        let newAdmin = await updateAdmin(admin["user_id"], data)

        if (! isEmpty(newAdmin)) {
            setCurrentAdmin(newAdmin)
            getElement(checkboxId).checked ? showAlert("Admin has been enabled"): showAlert("Admin has been disabled")
        }
    }

    const updateAdminAvatar = async () => {
        let avatar = getElement("edit-admin-avatar-input").files[0]
        if (! isEmpty(avatar)) {
            let data = new FormData()
            data.append("avatar", avatar)
            data = await updateAdmin(admin["user_id"], data)
            if (! isEmpty(data)) {
                setCurrentAdmin(data)
                showAlert("Admin avatar updated successfully")
            }
        } else {
            showAlert("Please choose your avatar first")
        }
    }

    const updateAdminInfo = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-input, "
        })

        let userInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))
        let data = new FormData()
        userInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data.append(usrInp.id.split("-")[0], usrInp.value)))
        isEmpty(data) && showAlert("You need to insert new admin information")
        if (! isEmpty(data)) {
            let newAdmin = await updateAdmin(admin["user_id"], data)
            if (! isEmpty(newAdmin)) {
                setCurrentAdmin(newAdmin)
                showAlert("Admin information updated successfully")
            }
        }
    }


    return (
        <div className="edit-user-container">
            <div className="user-info">
                <h1 className="edit-user-header">Admin Information</h1>
                <div className="user-avatar-password">
                    <div className="user-image">
                        <div className="avatar-hint">Click on your avatar if you want to change it!</div>
                        <div className="image-wrapper">
                            <img src={ imagePreview } alt="Avatar" />
                            <input id="edit-admin-avatar-input" type="file" accept="image/*" onChange={handleImageChange}/>
                            <i className="uil uil-camera-plus"></i>
                        </div>
                        <button className="button" onClick={() => updateAdminAvatar()}>Update Avatar</button>
                    </div>
                    <div className="user-generate-password">
                        <div className="password-hint">Click the button to create a new password for this admin and update their old password with the new one.</div>
                        <a href="#popup">
                            <button 
                                onClick={() => render("modal-content", "generate-password-modal", admin["user_id"])} 
                                className="button password-button"
                            >
                                Generate New Password
                            </button>
                        </a>
                        <hr style={{width: "95%", margin: "auto"}} />
                        <div className="enable-disable-user">
                            <div className="enable-disable-hint">Click on the switch button to enable or disable the admin!</div>
                            <div className="enable-disable-switch d-flex flex-column align-items-center">
                                <h6><span>Disabled</span><span>Enabled</span></h6>
                                <input 
                                    id="en-dis-admin" 
                                    className="checkbox d-none" 
                                    type="checkbox" 
                                    onChange={() => enableDisableAdmin("en-dis-admin")}
                                    defaultChecked={currentAdmin["enabled"] ?? admin["enabled"]}
                                />
                                <label for="en-dis-admin"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <table style={{marginTop: "100px"}} className="fl-table">
                    <thead>
                        <tr>
                            <th colSpan={3}>Information</th>
                        </tr>
                        <tr>
                            <th className="last-row" colSpan={3}></th>
                        </tr>
                        <tr>
                            <th>Attribute Name</th>
                            <th>Current Value</th>
                            <th>New Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredColumns?.map((column) => (
                            column !== "websites" &&
                            <tr>
                                <td>{ column }</td>
                                <td>{ typeof currentAdmin[column] === "boolean"? currentAdmin[column] ? "Yes" : "No" : currentAdmin[column] ?? "NULL"}</td>
                                <td className="info-input"> {
                                    column === "phone"? <input id="phone-input" placeholder={ "Type the new Phone here" } type="number"/> : 
                                    column === "email" ? <input id="email-input" placeholder={ "Type the new Email here" } type="email"/> : 
                                    <input id={column + "-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                                }</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="last-row" colSpan={3}></td>
                        </tr>
                    </tbody>
                </table>
                <div className="update-user">
                    <button className="button" onClick={() => updateAdminInfo()}>Update Admin Info</button>
                </div>
            </div>
        </div>
    )
}

export default EditAdmin